import server from '../src/index';
import  request  from 'supertest';
import {expect} from 'chai';


describe('Users Test',()=>{
    it('GET /api/users/generate returns an json of users',async()=>{
        const count = 20;
        const response= await request(server).get('/api/users/generate/').send({count});
        expect(response.status).to.equal(200)
        expect(response.headers).to.include({'Content-Type': 'application/json'});
        expect(response.headers).to.include({'Content-Length': count});
    })
})