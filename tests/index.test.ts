import {expect} from 'chai';
import config from  'config';
import server, {port} from '../src/index';
import  request  from 'supertest';
console.log(port)

describe('Server', ()=>{
    it('tests that server is running current port', async function () {
        expect(port).to.equal(config.get('port'))
   
    })

    it('POST /api/auth authentificate and gives access_token',async function () {
        const response = await request(server).post('/api/users/me')
            .set('login','Jacky75@hotmail.com')
            .set('password','password')
        expect(response.status).to.equal(200);
    })
});