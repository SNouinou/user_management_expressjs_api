import express from 'express';
import { GenerateUsers } from '../../core/application/GenerateUsers';
import { GenerateUsersInput } from '../../core/application/GenerateUsersInput';
import { container } from 'tsyringe';
import { User } from '../../core/domain/model/User';
import { PrismaClient } from '@prisma/client';
import { BatchUsers } from '../../core/application/BatchUsers';
import { BatchUsersInput } from '../../core/application/BatchUsersInput';

const UserRoute =express.Router();

UserRoute.get('/generate',async(req,res)=>{
    try {
        let userfaker:GenerateUsers = container.resolve(GenerateUsers);
        const usersList = userfaker.handle(req.query as unknown as GenerateUsersInput);
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


export { UserRoute };
