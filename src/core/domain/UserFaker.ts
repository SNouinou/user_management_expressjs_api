import { User } from "./model/User";

export interface UserFaker {
	fakeUsers(count:number): Array<User>;
}