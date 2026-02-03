using api.DTOs.Helpers;
using api.Enums;
using api.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;

namespace api.Controllers;

public class AccountController(IAccountRepository accountRepository) : BaseApiController
{
    // CRUD => Create, Read, Update, Delete

    [HttpPost("register")] // List<AppUser> appUsers = await _collection.Find(new BsonDocument()).ToListAsync(cancellationToken);
    public async Task<ActionResult<LoggedInDto>> Register(RegisterDto userInput, CancellationToken cancellationToken)
    {
        if (userInput.Password != userInput.ConfirmPassword)
            return BadRequest("Your passwords do not match!");

        OperationResult<LoggedInDto> opResult = await accountRepository.RegisterAsync(userInput, cancellationToken);

        return opResult.IsSuccess
        ? opResult.Result
        : opResult.Error?.Code switch
        {
            ErrorCode.NetIdentityFailed => BadRequest(opResult.Error.Message),
            ErrorCode.NetIdentityRoleFailed => BadRequest(opResult.Error.Message),
            ErrorCode.TokenGenerationFaild => BadRequest(opResult.Error.Message),
            _ => BadRequest("Something went wrong try again!")
        };
    }

    [HttpPost("login")]
    public async Task<ActionResult<LoggedInDto>> Login(LoginDto userInput, CancellationToken cancellationToken)
    {
        OperationResult<LoggedInDto> opResult = await accountRepository.LoginAsync(userInput, cancellationToken);

        return opResult.IsSuccess
        ? opResult.Result
        : opResult.Error?.Code switch
        {
            ErrorCode.WrongCreds => BadRequest(opResult.Error.Message),
            ErrorCode.TokenGenerationFaild => BadRequest(opResult.Error.Message),
            _ => BadRequest("Something went wrong try again later.")
        };
    }

    [Authorize]
    [HttpDelete("delete/{userId}")]
    public async Task<ActionResult<DeleteResult>> DeleteById(string userId, CancellationToken cancellationToken)
    {
        DeleteResult? deleteResult = await accountRepository.DeleteByIdAsync(userId, cancellationToken);

        if (deleteResult is null)
            return BadRequest("Operation failed");

        return deleteResult;
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<LoggedInDto>> ReloadLoggedInUser(CancellationToken cancellationToken)
    {
        // obtain token value
        string? token = null;

        bool isTokenValid = HttpContext.Request.Headers.TryGetValue("Authorization", out var authHeader);

        // Console.WriteLine(authHeader);

        if (isTokenValid)
            token = authHeader.ToString().Split(' ').Last();

        if (string.IsNullOrEmpty(token))
            return Unauthorized("Token is expired or invalid. Login again.");

        string? userId = User.GetUserId();

        if (userId is null)
            return Unauthorized();

        // get loggedInDto
        LoggedInDto? loggedInDto =
        await accountRepository.ReloadLoggedInUserAsync(userId, token, cancellationToken);

        return loggedInDto is null ? Unauthorized("User is logged out or unauthorized. Login again") : loggedInDto;
    }

    [HttpGet("get-http")]
    public void GetContext()
    {
        bool isTokenValid = HttpContext.Request.Headers.TryGetValue("Authorization", out var authHeader);

        // Console.WriteLine(authHeader);

        string token = authHeader.ToString().Split(' ').Last();

        Console.WriteLine(token);
    }
}