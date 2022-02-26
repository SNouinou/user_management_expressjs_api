import { inject, injectable } from "tsyringe";
import { User } from "../domain/model/User";
import { UserFaker } from "../domain/UserFaker";
import { GenerateUsersInput } from "./GenerateUsersInput";

@injectable()
export class GenerateUsers{
    constructor(
        @inject('UserFaker') public userFaker: UserFaker
    ){}

    handle(input:GenerateUsersInput):Array<User>{
        return this.userFaker.fakeUsers(input.count);
    }
}