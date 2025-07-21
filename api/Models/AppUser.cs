namespace api.Models;

public record AppUser(
    [property: BsonId, BsonRepresentation(BsonType.ObjectId)]
    string? Id,
    // string IdentifierHash,
    [EmailAddress] string Email,
    string UserName,
    string Password,
    string ConfirmPassword,
    DateOnly DateOfBirth, 
    string Gender,
    string City,
    string Country
);

// DTO => Data/Transfer/Object
// public record LoggedInUserDto(
//     string Email,
//     string Name
// );