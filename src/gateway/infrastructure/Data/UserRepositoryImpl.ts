import { PrismaClient } from '@prisma/client';
import { Lifecycle, scoped } from 'tsyringe';
import { BatchFeedback } from '../../../core/domain/model/BatchFeedback';
import { User } from '../../../core/domain/model/User';
import { UserRepository } from '../../../core/domain/UserRepository';
import { UserEntity } from './UserEntity';

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

    async findUserByLogin(login: string): Promise<User> {

        const prisma = new PrismaClient()

        try {
            let user = await prisma.user.findFirst({
                where: {
                    OR: [
                        {
                            email: login
                        },
                        {
                            username: login
                        }
                    ]
                }
            });
            if (!user) {
                throw new Error('user not found');
            }

            return new UserEntity(user).toDomain();

        } catch (error) {
            throw error

        } finally {
            prisma.$disconnect();
        }
    }

}