export interface AppUser {
    email: string;
    userName: string;
    password: string;
    confirmPassword: string;
    dateOfBirth: string | undefined;
    gender: string;
    city: string;
    country: string;
}