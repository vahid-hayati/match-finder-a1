

namespace api.Repositories;

public class UserRepository : IUserRepository
{
    private readonly IMongoCollection<AppUser> _collection;
    private readonly ITokenService _tokenService;
    private readonly IPhotoService _photoService;

    // Dependency Injection
    public UserRepository(IMongoClient client, IMongoDbSettings dbSettings, ITokenService tokenService, IPhotoService photoService)
    {
        var dbName = client.GetDatabase(dbSettings.DatabaseName);
        _collection = dbName.GetCollection<AppUser>("users");

        _tokenService = tokenService;
        _photoService = photoService;
    }

    public async Task<AppUser?> GetByIdAsync(string userId, CancellationToken cancellationToken)
    {
        AppUser? appUser = await _collection.Find(doc => doc.Id == userId).SingleOrDefaultAsync(cancellationToken);

        if (appUser is null)
            return null;

        return appUser;
    }

    public async Task<MemberDto?> UpdateByIdAsync(string userId, AppUser userInput, CancellationToken cancellationToken)
    {
        UpdateDefinition<AppUser> updateDef = Builders<AppUser>.Update
            .Set(user => user.Email, userInput.Email.Trim().ToLower());

        await _collection.UpdateOneAsync(user
            => user.Id == userId, updateDef, null, cancellationToken);

        AppUser appUser = await _collection.Find(user => user.Id == userId).FirstOrDefaultAsync(cancellationToken);

        if (appUser is null)
            return null;

        return Mappers.ConvertAppUserToMemberDto(appUser);
    }

    public async Task<Photo?> UploadPhotoAsync(IFormFile file, string userId, CancellationToken cancellationToken)
    {
        AppUser? appUser = await GetByIdAsync(userId, cancellationToken);

        if (appUser is null)
            return null;

        // ObjectId objectId = ObjectId.Parse(userId);

        if (!ObjectId.TryParse(userId, out var objectId))
            return null;

        string[]? imageUrls = await _photoService.AddPhotoToDiskAsync(file, objectId);

        if (imageUrls is not null)
        {
            Photo photo;

            photo = appUser.Photos.Count == 0
                ? Mappers.ConvertPhotoUrlsToPhoto(imageUrls, isMain: true)
                : Mappers.ConvertPhotoUrlsToPhoto(imageUrls, isMain: false);

            appUser.Photos.Add(photo);

            UpdateDefinition<AppUser> updatedUser = Builders<AppUser>.Update
                .Set(doc => doc.Photos, appUser.Photos);

            UpdateResult result = await _collection.UpdateOneAsync(doc => doc.Id == userId, updatedUser, null, cancellationToken);

            return result.ModifiedCount == 1 ? photo : null;
        }

        return null;
    }
}
