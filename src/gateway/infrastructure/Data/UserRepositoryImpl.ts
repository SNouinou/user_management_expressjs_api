import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { Lifecycle, scoped } from 'tsyringe';
import { BatchFeedback } from '../../../core/domain/model/BatchFeedback';
import { Role } from '../../../core/domain/model/Role';
import { User } from '../../../core/domain/model/User';
import { UserRepository } from '../../../core/domain/UserRepository';

@scoped(Lifecycle.ResolutionScoped)
export class UserRepositoryImpl implements UserRepository {

    constructor(
    ) { }
    
    async saveAll(usersList: Array<User>): Promise<BatchFeedback> {

        const prisma = new PrismaClient()
        try {
            
            let success = 0, failure = 0;
            for (var i = 0; i < usersList.length; i++) {
                try {
                    const entity = await prisma.user.create({
                        data: usersList[i]
                    });
                    if (entity) { success++; } else { failure++; }
                } catch (error) {
                    failure++;
                    //console.log(error);
                }
            }
            return new BatchFeedback(success, failure);

        } catch (error) {
            throw error
        } finally {
            prisma.$disconnect();
        }
    }

}