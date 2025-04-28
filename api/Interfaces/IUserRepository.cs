namespace api.Interfaces;

public interface IUserRepository
{
    public Task<LoggedInDto?> UpdateByIdAsync(string userId, AppUser userInput, CancellationToken cancellationToken);
}
