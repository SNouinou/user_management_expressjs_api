import express from 'express';
import { GenerateUsers } from '../../core/application/GenerateUsers';
import { GenerateUsersInput } from '../../core/application/GenerateUsersInput';
import { container } from 'tsyringe';
import { User } from '../../core/domain/model/User';
import { BatchUsers } from '../../core/application/BatchUsers';
import { BatchUsersInput } from '../../core/application/BatchUsersInput';
import { CheckProfile } from '../../core/application/CheckProfile';
import { CheckProfileInput } from '../../core/application/CheckProfileInput';

import jwt from "jsonwebtoken";
import config from 'config';

const UserRoute =express.Router();

UserRoute.get('/generate',async(req,res)=>{
    try {
        let generateUsers:GenerateUsers = container.resolve(GenerateUsers);
        const usersList = generateUsers.handle(req.query as unknown as GenerateUsersInput);
        res.setHeader('Content-type', 'application/json');
        res.setHeader('Content-disposition', 'attachment; filename=users_list.json');
        res.status(200).send(JSON.stringify(usersList))
    } catch (error) {
        res.status(500).send({message:'Interval server error'})
    }
})

UserRoute.post('/batch',async(req,res)=>{
    try {

        const { data }  = req!.files!.file as any ; 
        const usersList:Array<User> = JSON.parse(data.toString('utf8'));
        
        let userBulk:BatchUsers = container.resolve(BatchUsers);
        let { success, failure } = await userBulk.handle(new BatchUsersInput(usersList));
        
        res.setHeader('Content-type', 'application/json');
        res.status(200).send({
            success: success,
            fail: failure
        });
    } catch (error) {
        res.status(500).send({message:'Interval server error'})
    }
})


function authenticateToken(
    req: any,
    res: any,
    next: any) {
  
    const authHeader = req.headers['access_token']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401)
  
    const key = config.get('token_key');
    
    jwt.verify(token, key as string, (err: any, user: any) => {
  
      if (err) { console.log(err); return res.sendStatus(403); }
  
      req.user = user
  
      next()
    })
  }

UserRoute.post('/:user', authenticateToken, async(req,res)=>{
    try {

        let authUser = (req as any)?.user?.username as string;

        let { user : urlUser } = req.params;
        let userProfile : string = urlUser === 'me' ? authUser as string : urlUser;

        let userBulk:CheckProfile = container.resolve(CheckProfile);
        let profile = await userBulk.handle(new CheckProfileInput(authUser,userProfile));
        
        res.status(200).send({
            profile
        });
    } catch (error) {
        res.status(500).send({message:'Interval server error'})
    }
})


export { UserRoute };
