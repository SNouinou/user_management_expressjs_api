import {Role} from "./Role";

export class User {
  constructor(
    public firstName: string,
    public lastName: string,
    public birthDate: Date,
    public city: string,
    public country: string,
    public avatar: string,
    public company: string,
    public jobPosition: string,
    public mobile: string,
    public username: string,
    public email: string,
    public password: string,
    public role: Role
    ) {}
}
