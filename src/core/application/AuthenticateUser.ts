import { inject, injectable } from "tsyringe";
import { User } from "../domain/model/User";
import { UserRepository } from "../domain/UserRepository";
import { AuthenticateUserInput } from "./AuthenticateUserInput";
import { GenerateUsersInput } from "./GenerateUsersInput";

@injectable()
export class AuthenticateUser{
    constructor(
        @inject('UserRepository') public userRepository: UserRepository,
    ){}

    async handle(input:AuthenticateUserInput):Promise<string>{
        const user = await this.userRepository.findUserByLogin(input.login);
        return user.email;
    }
}