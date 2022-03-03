import express from 'express';
import { GenerateUsers } from '../../core/application/GenerateUsers';
import { GenerateUsersInput } from '../../core/application/GenerateUsersInput';
import { container } from 'tsyringe';
import { User } from '../../core/domain/model/User';
import { PrismaClient } from '@prisma/client';

const UserRoute =express.Router();

const prisma = new PrismaClient();

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
        
        let { success, failed } = await createMulti(usersList);
        
        res.setHeader('Content-type', 'application/json');
        res.status(200).send({
            success: success,
            fail: failed
        });
    } catch (error) {
        res.status(500).send({message:'Interval server error'})
    } finally {
        await prisma.$disconnect()
    }
})


export { UserRoute };

async function createMulti(usersList: User[]) {
    let success = 0, failed = 0;
    for (var i = 0; i < usersList.length; i++) {
        try {
            const entity = await prisma.user.create({
                data: usersList[i]
            });
            if (entity) { success++; } else { failed++; }
        } catch (error) {
            failed++;
            console.log(error);
        }
    }
    return { success, failed };
}
