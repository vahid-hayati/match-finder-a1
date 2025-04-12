namespace api.Repositories;

public class AccountRepository : IAccountRepository
{
    private readonly IMongoCollection<AppUser> _collection;

    // Dependency Injection
    public AccountRepository(IMongoClient client, IMongoDbSettings dbSettings)
    {
        var dbName = client.GetDatabase(dbSettings.DatabaseName);
        _collection = dbName.GetCollection<AppUser>("users");
    }

    public async Task<LoggedInDto?> RegisterAsync(AppUser userInput, CancellationToken cancellationToken)
    {
        AppUser user = await _collection.Find<AppUser>(doc =>
            doc.Email == userInput.Email).FirstOrDefaultAsync(cancellationToken);

        if (user is not null)
            return null;

        await _collection.InsertOneAsync(userInput, null, cancellationToken);

        // DTO => Data/ Transfer/ Object
        LoggedInDto loggedInDto = new(
            Email: userInput.Email,
            Name: userInput.Name
        );

        return loggedInDto;
    }

    public async Task<LoggedInDto?> LoginAsync(LoginDto userInput, CancellationToken cancellationToken)
    {
        AppUser user =
         await _collection.Find(doc => doc.Email == userInput.Email && doc.Password == userInput.Password)
         .FirstOrDefaultAsync(cancellationToken);

         if (user is null)
            return null;

        LoggedInDto loggedInDto = new (
            Email: user.Email,
            Name: user.Name
        );

        return loggedInDto;
    }

    public async Task<List<AppUser>?> GetAllAsync(CancellationToken cancellationToken)
    {
        List<AppUser> appUsers = await _collection.Find(new BsonDocument()).ToListAsync(cancellationToken);

        if (appUsers.Count == 0)
            return null;

        return appUsers;
    }

    public async Task<LoggedInDto?> UpdateByIdAsync(string userId, AppUser userInput, CancellationToken cancellationToken)
    {
        UpdateDefinition<AppUser> updateDef = Builders<AppUser>.Update
            .Set(user => user.Email, userInput.Email.Trim().ToLower());

        await _collection.UpdateOneAsync(user
            => user.Id == userId, updateDef, null, cancellationToken);

        AppUser appUser = await _collection.Find(user => user.Id == userId).FirstOrDefaultAsync(cancellationToken);

        if (appUser is null)
            return null;

        LoggedInDto loggedInDto = new(
            Email: appUser.Email,
            Name: appUser.Name
        );

        return loggedInDto;
    }

    public async Task<DeleteResult?> DeleteByIdAsync(string userId, CancellationToken cancellationToken)
    {
        AppUser appUser = await _collection.Find<AppUser>(doc => doc.Id == userId).FirstOrDefaultAsync(cancellationToken);

        if (appUser is null)
        {
            return null;
        }

        return await _collection.DeleteOneAsync<AppUser>(doc => doc.Id == userId, cancellationToken);
    }
}
