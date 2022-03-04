import { User } from "../domain/model/User";

export class BatchUsersInput{
    constructor(
        public usersList:Array<User>
        ){}
}