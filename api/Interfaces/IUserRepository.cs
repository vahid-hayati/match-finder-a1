namespace api.Interfaces;

public interface IUserRepository
{
    public Task<AppUser?> GetByIdAsync(string userId, CancellationToken cancellationToken);
    public Task<MemberDto?> UpdateByIdAsync(string userId, AppUser userInput, CancellationToken cancellationToken);
    public Task<Photo?> UploadPhotoAsync(IFormFile file, string userId, CancellationToken cancellationToken);
    public Task<UpdateResult?> SetMainPhotoAsync(string hashedUserId, string photoUrlIn, CancellationToken cancellationToken);
    public Task<UpdateResult?> DeletePhotoAsync(string hashedUserId, string? urlIn, CancellationToken cancellationToken);
}
