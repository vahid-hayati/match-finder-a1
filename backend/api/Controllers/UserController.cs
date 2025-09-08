using api.Extensions;
using api.Extensions.Validations;
using Microsoft.AspNetCore.Authorization;

namespace api.Controllers;

//PrimaryConstructor
[Authorize]
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

    [HttpPut("add-photo")]
    public async Task<ActionResult<Photo>> AddPhoto(
        [AllowedFileExtensions, FileSize(250_000, 4_000_000)]
        IFormFile file, CancellationToken cancellationToken
    )
    {
        if (file is null) return BadRequest("No file selected with this request");

        string? userId = User.GetUserId();

        if (userId is null)
        {
            return Unauthorized("You are not logged in. please login again");
        }

        Photo? photo = await userRepository.UploadPhotoAsync(file, userId, cancellationToken);

        return photo is null ? BadRequest("Add photo failed. See logger") : photo;
    }

    [HttpPut("set-main-photo")]
    public async Task<ActionResult> SetMainPhoto(string photoUrlIn, CancellationToken cancellationToken)
    {
        string? userId = User.GetUserId();

        if (userId is null)
        {
            return Unauthorized("You are not logged in. please login again");
        }

        UpdateResult? updateResult = await userRepository.SetMainPhotoAsync(userId, photoUrlIn, cancellationToken);

        return updateResult is null || !updateResult.IsModifiedCountAvailable
            ? BadRequest("Set as main photo failed. Try again in a few moments. If the issue persists contact the admin.")
            : Ok("Set this photo as main succeeded.");
    }

    [HttpPut("delete-photo")]
    public async Task<ActionResult> DeletePhoto(string photoUrlIn, CancellationToken cancellationToken)
    {
        string? userId = User.GetUserId();

        if (string.IsNullOrEmpty(userId))
            return Unauthorized("The user is not logged in");

        UpdateResult? updateResult = await userRepository.DeletePhotoAsync(userId, photoUrlIn, cancellationToken);

        return updateResult is null || !updateResult.IsModifiedCountAvailable
            ? BadRequest("Photo deletion failed. Try again in a few moments. If the issue persists contact the admin.")
            : Ok("Photo deleted successfully.");
    }
}
