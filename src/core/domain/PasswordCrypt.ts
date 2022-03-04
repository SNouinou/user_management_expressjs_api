export interface PasswordCrypt {
	crypt(password:string): Promise<string>;
	comparePassword(password:string, crypted:string): Promise<boolean>;
}