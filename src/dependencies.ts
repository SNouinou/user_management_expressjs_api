import {container} from "tsyringe";
import {UserFakerImpl} from "./gateway/infrastructure/Fake/UserFakerImpl"

export default function register(){
    container.register('UserFaker', { useClass: UserFakerImpl});
}