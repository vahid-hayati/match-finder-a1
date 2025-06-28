namespace api.DTOs;

public record LoggedInDto(
    string Email,
    string UserName,
    int Age
);






/* Mapper
public static LoggedInDto ConvertAppUserToLoggedInDto(AppUser appUser)
    {
        return new LoggedInDto(
            Email: appUser.Email,
            UserName: appUser.UserName
        );
    }

    public static MemberDto ConvertAppUserToMemberDto(AppUser appUser)
    {
        return new MemberDto(
            Email: appUser.Email,
            UserName: appUser.UserName,
            Age: appUser.Age,
            Gender: appUser.Gender,
            City: appUser.City,
            Country: appUser.Country
        );
    }
*/