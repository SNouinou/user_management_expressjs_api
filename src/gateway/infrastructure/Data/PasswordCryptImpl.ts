import { PrismaClient } from '@prisma/client';
import { Lifecycle, scoped } from 'tsyringe';
import { BatchFeedback } from '../../../core/domain/model/BatchFeedback';
import { User } from '../../../core/domain/model/User';
import { PasswordCrypt } from '../../../core/domain/PasswordCrypt';
import bcrypt from 'bcrypt';

@scoped(Lifecycle.ResolutionScoped)
export class PasswordCryptImpl implements PasswordCrypt {

    constructor(
    ) { }
    async crypt(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }
    comparePassword(password:string, hashPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashPassword);
    }

}