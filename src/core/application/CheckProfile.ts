import { inject, injectable } from "tsyringe";
import { User } from "../domain/model/User";
import { PasswordCrypt } from "../domain/PasswordCrypt";
import { UserRepository } from "../domain/UserRepository";
import { CheckProfileInput } from "./CheckProfileInput";
import { GenerateUsersInput } from "./GenerateUsersInput";
import jwt, { Secret } from "jsonwebtoken";
import config from "config";
import { TokenSignature } from "../domain/TokenSignature";
import { Profile } from "../domain/model/Profile";
import { Role } from "../domain/model/Role";

@injectable()
export class CheckProfile{
    constructor(
        @inject('UserRepository') public userRepository: UserRepository,
    ){}

    async handle(input:CheckProfileInput):Promise<Profile>{
        const currentUser = await this.userRepository.findUserByLogin(input.authenticatedUser);
        
        if(input.authenticatedUser === input.profileUser) {
            return currentUser.toProfile();
        } else if(currentUser.role === Role.ADMIN) {
            return (await this.userRepository.findUserByLogin(input.profileUser)).toProfile();
        } else {
            throw new Error('not authorized');
        }
    }
}