using Microsoft.AspNetCore.Authorization;

namespace api.Controllers;

//PrimaryConstructor
[Authorize]
public class UserController(IUserRepository userRepository) : BaseApiController
{
    [HttpPut("update/{userId}")]
    public async Task<ActionResult<LoggedInDto>> UpdateById(string userId, AppUser userInput, CancellationToken cancellationToken)
    {
        LoggedInDto? loggedInDto = await userRepository.UpdateByIdAsync(userId, userInput, cancellationToken);

        if (loggedInDto is null)
            return BadRequest("Operation failed.");

        return loggedInDto;
    }
}
