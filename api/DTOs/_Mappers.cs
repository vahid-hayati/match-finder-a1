namespace api.DTOs;

public static class Mappers
{
    public static LoggedInDto ConvertAppUserToLoggedInDto(AppUser appUser, string tokenValue)
    {
        // LoggedInDto loggedInDto = new(
        //     Email: appUser.Email,
        //     UserName: appUser.UserName,
        //     Age: appUser.Age
        // );

        // return loggedInDto;

        return new(
            Email: appUser.Email,
            UserName: appUser.UserName,
            Age: appUser.Age,
            Token: tokenValue
        );
    }

    public static MemberDto ConvertAppUserToMemberDto(AppUser appUser)
    {
        // MemberDto memberDto = new(
        //     Email: appUser.Email,
        //     UserName: appUser.UserName,
        //     Age: appUser.Age,
        //     Gender: appUser.Gender,
        //     City: appUser.City,
        //     Country: appUser.Country
        // );

        // return memberDto;

        return new(
            Email: appUser.Email,
            UserName: appUser.UserName,
            Age: appUser.Age,
            Gender: appUser.Gender,
            City: appUser.City,
            Country: appUser.Country
        );
    }
}