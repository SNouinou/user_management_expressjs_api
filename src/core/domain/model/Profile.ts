import {Role} from "./Role";

export class Profile {
  constructor(
    public firstName: string,
    public lastName: string,
    public birthDate: Date | null,
    public city: string,
    public country: string,
    public avatar: string,
    public company: string,
    public jobPosition: string,
    public mobile: string,
    public username: string,
    public email: string,
    public role: Role
    ) {}
}
