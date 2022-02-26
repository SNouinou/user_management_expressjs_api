import express from 'express';
import { GenerateUsers } from '../../core/application/GenerateUsers';
import { GenerateUsersInput } from '../../core/application/GenerateUsersInput';
import { container } from 'tsyringe';

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


export { UserRoute };