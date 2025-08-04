using api.Extensions;
using Microsoft.AspNetCore.Authorization;

namespace api.Controllers;

//PrimaryConstructor
// [Authorize]
public class UserController(IUserRepository userRepository) : BaseApiController
{
    [HttpPut("update")]
    public async Task<ActionResult<MemberDto>> UpdateById(AppUser userInput, CancellationToken cancellationToken)
    {
        var userId = User.GetUserId();

        Console.WriteLine(userId);

        if (userId is null)
            return Unauthorized("You are not logged. Please login again");

        MemberDto? memberDto = await userRepository.UpdateByIdAsync(userId, userInput, cancellationToken);

        if (memberDto is null)
            return BadRequest("Operation failed.");

        return memberDto;
    }

    public void GetClaims()
    {
        string? userId = User.GetUserId();
    }
}
