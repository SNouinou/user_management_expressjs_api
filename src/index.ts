import "reflect-metadata"
import config from "config";
import Debug from "debug";
import express from "express";
import { AddressInfo } from 'net';
import loadDependencies from "./dependencies";
import {UserRoute} from "./gateway/exposition/UserRoute";
import fileUpload from "express-fileupload";

require('dotenv-flow').config();

loadDependencies();

const debug = Debug('server:debug')

const app=express();

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  }));

const listen = app.listen(config.get('port'),()=>{
    debug(`server is running on port ${config.get('port')} and in ${config.get('name')} mode`);
    console.log(`server is running on port ${config.get('port')} and in ${config.get('name')} mode`);
});

app.use('/api/users/', UserRoute);

const { port } = listen!.address() as AddressInfo;

export default app;
export { port };
