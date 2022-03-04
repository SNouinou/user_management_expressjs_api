import { inject, injectable } from "tsyringe";
import { BatchFeedback } from "../domain/model/BatchFeedback";
import { UserRepository } from "../domain/UserRepository";
import { BatchUsersInput } from "./BatchUsersInput";

@injectable()
export class BatchUsers{
    constructor(
        @inject('UserRepository') public userRepository: UserRepository
    ){}

    async handle(input:BatchUsersInput):Promise<BatchFeedback>{
        return await this.userRepository.saveAll(input.usersList);
    }
}