import {container} from "tsyringe";
import { UserRepositoryImpl } from "./gateway/infrastructure/Data/UserRepositoryImpl";
import {UserFakerImpl} from "./gateway/infrastructure/Fake/UserFakerImpl"

export default function register(){
    container.register('UserFaker', { useClass: UserFakerImpl});
    container.register('UserRepository', {useClass: UserRepositoryImpl})
}