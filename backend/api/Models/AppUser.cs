using System.Runtime.InteropServices;

namespace api.Models;

public class AppUser
{
    [property: BsonId, BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; init; }
    public string Email { get; init; } = string.Empty; // ""
    public string UserName { get; init; } = string.Empty;
    public string Password { get; init; } = string.Empty;
    public string ConfirmPassword { get; init; } = string.Empty; 
    public DateOnly DateOfBirth { get; init; }
    public DateTime LastActive { get; init; }
    public string Gender { get; init; } = string.Empty;
    public string Introduction { get; init; } = string.Empty;
    public string LookingFor { get; init; } = string.Empty;
    public string Interests { get; init; } = string.Empty;
    public string City { get; init; } = string.Empty;
    public string Country { get; init; } = string.Empty;
    public List<Photo> Photos { get; init; } = [];
}

// public record AppUser(
//     [property: BsonId, BsonRepresentation(BsonType.ObjectId)]
//     string? Id,
//     // string IdentifierHash,
//     [EmailAddress] string Email,
//     string UserName,
//     string Password,
//     string ConfirmPassword,
//     [Range(typeof(DateOnly), "1900-01-01", "2050-01-01", ErrorMessage = "Date of birth must be between 1900 and 2050.")]
//     DateOnly DateOfBirth,
//     DateTime LastActive,
//     string Gender,
//     string Introduction,
//     string LookingFor,
//     string Interests,
//     string City,
//     string Country,
//     List<Photo> Photos
// );

// DTO => Data/Transfer/Object
// public record LoggedInUserDto(
//     string Email,
//     string Name
// );