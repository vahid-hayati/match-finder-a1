namespace api.Interfaces;

public interface IMemberRepository
{
    public Task<List<AppUser>?> GetAllAsync(CancellationToken cancellationToken);
}
