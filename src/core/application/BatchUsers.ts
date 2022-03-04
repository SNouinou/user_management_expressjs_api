import { inject, injectable } from "tsyringe";
import { BatchFeedback } from "../domain/model/BatchFeedback";
import { UserRepository } from "../domain/UserRepository";
import { PasswordCrypt } from "../domain/PasswordCrypt";
import { BatchUsersInput } from "./BatchUsersInput";

@injectable()
export class BatchUsers{
    constructor(
        @inject('UserRepository') public userRepository: UserRepository,
        @inject('PasswordCrypt') public passwordCrypt: PasswordCrypt
    ){}

    async handle(input:BatchUsersInput):Promise<BatchFeedback>{
        for(let i = 0; i<input.usersList.length; i++) {
            input.usersList[i].password = await this.passwordCrypt.crypt(input.usersList[i].password);
        }
        return await this.userRepository.saveAll(input.usersList);
    }
}