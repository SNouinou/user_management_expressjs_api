import { BatchFeedback } from "./model/BatchFeedback";
import { User } from "./model/User";

export interface UserRepository {
	saveAll(usersList:Array<User>): Promise<BatchFeedback>;
}