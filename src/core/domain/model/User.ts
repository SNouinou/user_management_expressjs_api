import { Profile } from "./Profile";
import {Role} from "./Role";

export class User {
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
    public password: string,
    public role: Role
    ) {}

    toProfile(){
      return new Profile(
         this.firstName,
         this.lastName,
         this.birthDate,
         this.city,
         this.country,
         this.avatar,
         this.company,
         this.jobPosition,
         this.mobile,
         this.username,
         this.email,
         this.role
      )
    }
}
