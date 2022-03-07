import { User } from "./model/User";

export interface TokenSignature {
    key: string;
    expiration: string;
	sign(username:string,email:string): string;
}