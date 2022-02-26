import "reflect-metadata"
import config from "config";
import Debug from "debug";
import express from "express";
import { AddressInfo } from 'net';
import { GenerateUsers } from "./core/application/GenerateUsers";
import { GenerateUsersInput } from "./core/application/GenerateUsersInput";
import { Role } from "./core/domain/model/Role";
import { User } from "./core/domain/model/User";
import { UserFaker } from "./core/domain/UserFaker";
import {container, registry} from "tsyringe";
import loadDependencies from "./dependencies";
import {UserRoute} from "./gateway/exposition/UserRoute";

loadDependencies();

// let userfaker:GenerateUsers = container.resolve(GenerateUsers);
// console.log(userfaker.handle(new GenerateUsersInput(20)));
// let userfaker:UserFaker = container.resolve('UserFaker');
// console.log(userfaker);

const debug = Debug('server:debug')

const app=express();

const listen = app.listen(config.get('port'),()=>{
    debug(`server is running on port ${config.get('port')} and in ${config.get('name')} mode`);
    console.log(`server is running on port ${config.get('port')} and in ${config.get('name')} mode`);
});

app.use('/api/users/', UserRoute);

const { port } = listen!.address() as AddressInfo;

export default app;
export { port };
