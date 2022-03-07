import { inject, injectable } from "tsyringe";
import { User } from "../domain/model/User";
import { PasswordCrypt } from "../domain/PasswordCrypt";
import { UserRepository } from "../domain/UserRepository";
import { AuthenticateUserInput } from "./AuthenticateUserInput";
import { GenerateUsersInput } from "./GenerateUsersInput";
import jwt, { Secret } from "jsonwebtoken";
import config from "config";
import { TokenSignature } from "../domain/TokenSignature";

@injectable()
export class AuthenticateUser{
    constructor(
        @inject('UserRepository') public userRepository: UserRepository,
        @inject('PasswordCrypt') public passwordCrypt: PasswordCrypt,
        @inject('TokenSignature') public tokenSignature: TokenSignature,
    ){}

    async handle(input:AuthenticateUserInput):Promise<string>{
        const user = await this.userRepository.findUserByLogin(input.login);
        
        if(! await this.passwordCrypt.comparePassword(input.password,user.password)) {
            throw Error('Wrong password');
        }

        const {username, email} = user;
        return this.tokenSignature.sign(username, email);
    }
}