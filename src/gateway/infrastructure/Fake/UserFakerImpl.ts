import { faker } from '@faker-js/faker';
import { Lifecycle, scoped } from 'tsyringe';
import { Role } from '../../../core/domain/model/Role';
import { User } from '../../../core/domain/model/User';
import { UserFaker } from '../../../core/domain/UserFaker';

@scoped(Lifecycle.ResolutionScoped)
export class UserFakerImpl implements UserFaker {

    constructor(){}
    fakeUsers(count: number): User[] {

        let fakeUsers: User[] = new Array<User>();

        
        for(let i = 0; i < count; i++){
            
            let firstName = faker.name.firstName();
            let lastName = faker.name.lastName();

            fakeUsers.push(

                new User(
                    firstName,
                    lastName,
                    faker.date.past(20,'2000-01-01T00:00:00.000Z'),
                    faker.address.cityName(),
                    faker.address.country(),
                    faker.image.imageUrl(),
                    faker.company.companyName(),
                    faker.name.jobTitle(),
                    faker.phone.phoneNumber(),
                    faker.internet.userName(firstName,lastName),
                    faker.internet.email(firstName,lastName),
                    faker.internet.password(),
                    Object.values(Role)[Math.round(Math.random()*(Object.values(Role).length)-1)]
                )
            );
        }

        return fakeUsers;
    }

}