import { User as UserPrisma } from ".prisma/client";
import { User } from "../../../core/domain/model/User";
import { Role } from "../../../core/domain/model/Role";

export class UserEntity {

    constructor(
        public user: UserPrisma
    ) {}

    static toEntity(user : User) : UserPrisma {
        return {
            ID: 0,
            ...user
        };
    }

    toDomain(): User {
            const {
                 firstName,
                 lastName,
                 birthDate,
                 city,
                 country,
                 avatar,
                 company,
                 jobPosition,
                 mobile,
                 username,
                 email,
                 password,
                 role
            } = this.user;

            return new User(
                firstName,
                lastName,
                birthDate,
                city,
                country,
                avatar? avatar : '',
                company,
                jobPosition,
                mobile? mobile : '',
                username,
                email,
                password,
                role === "ADMIN" ? Role.ADMIN : Role.USER
            );
    } 
        
}