using api.Extensions;
using Microsoft.AspNetCore.Authorization;

namespace api.Controllers;

//PrimaryConstructor
// [Authorize]
public class UserController(IUserRepository userRepository) : BaseApiController
{
    [HttpPut("update")]
    public async Task<ActionResult<LoggedInDto>> UpdateById(AppUser userInput, CancellationToken cancellationToken)
    {
        var userId = User.GetUserId();

        if (userId is null)
            return Unauthorized("You are not logged. Please login again");

        LoggedInDto? loggedInDto = await userRepository.UpdateByIdAsync(userId, userInput, cancellationToken);

        if (loggedInDto is null)
            return BadRequest("Operation failed.");

        return loggedInDto;
    }

    public void GetClaims()
    {
        string? userId = User.GetUserId();
    }
}
