import config from "config";
import Debug from "debug";
import express from "express";
import fileUpload from "express-fileupload";
import { AddressInfo } from 'net';
import "reflect-metadata";
import { AuthenticateUser } from "./core/application/AuthenticateUser";
import loadDependencies from "./dependencies";
import { UserRoute } from "./gateway/exposition/UserRoute";
import {container} from "tsyringe";
import { AuthenticateUserInput } from "./core/application/AuthenticateUserInput";
import bodyParser from "body-parser";

require('dotenv-flow').config();

loadDependencies();

const debug = Debug('server:debug')

const app=express();

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  }));

app.use(bodyParser.json());

const listen = app.listen(config.get('port'),()=>{
    debug(`server is running on port ${config.get('port')} and in ${config.get('name')} mode`);
    console.log(`server is running on port ${config.get('port')} and in ${config.get('name')} mode`);
});

app.post('/api/auth/',async function (req,res) {
  try {
      const {login, password} = req.body;

      const userAuthenticate:AuthenticateUser = container.resolve(AuthenticateUser);
      if(!login || !password) {
        throw new Error('Request invalid');
      }
      const jwt = await userAuthenticate.handle(new AuthenticateUserInput(login.toString(),password.toString()));

      res.status(200).send({
          access_token: jwt
      });
  } catch (error) {
      res.status(500).send({message:'Interval server error'})
  }
});

app.use('/api/users/', UserRoute);

const { port } = listen!.address() as AddressInfo;

export default app;
export { port };

