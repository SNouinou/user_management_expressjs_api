import Debug from "debug";
import config from "config";
import express from "express";
import { AddressInfo } from 'net';

const debug = Debug('server:debug')

const app=express();

const listen = app.listen(config.get('port'),()=>{
    debug(`server is running on port ${config.get('port')} and in ${config.get('name')} mode`);
    console.log(`server is running on port ${config.get('port')} and in ${config.get('name')} mode`);
})



module.exports = app;
const { port } = listen!.address() as AddressInfo;
module.exports.port = port;