namespace api.DTOs;

public record RegisterDto(
    string UserName,
    [EmailAddress]
    string Email,
    DateOnly DateOfBirth,
    string Password,
    string ConfirmPassword,
    [Length(3, 20)] string Gender
);
