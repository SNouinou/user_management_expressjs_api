import server from '../src/index';
import  request  from 'supertest';
import {expect} from 'chai';
import faker from '@faker-js/faker';

describe('/api/users/ Route',()=>{

    let accessToken ;

    it('GET /api/users/generate returns an json of users',async function (){
        const count = faker.datatype.number(100);
        const response = await request(server).get('/api/users/generate/').query({count});
        expect(response.status).to.equal(200);
        expect(response.headers).to.include({'content-type': 'application/json; charset=utf-8'});
        expect(response.headers).to.include({'content-disposition': 'attachment; filename=users_list.json'});
        expect(response.body.length).to.equal(count);
    })

    it('POST /api/users/batch load users from json file',async function () {
        this.timeout(0);
        const response = await request(server).post('/api/users/batch/')
            .type('multipart/form-data')
            .attach('file', `${__dirname}/resources/users_list.json`)
            .timeout(0);
        expect(response.status).to.equal(200);
        expect(response.body.success).to.equal(5);
        expect(response.body.fail).to.equal(1);
    })

    it('POST /api/auth authentificate and gives access_token',async function () {
        const response = await request(server).post('/api/auth')
            .send({
                'login':'Jacky75@hotmail.com',
                'password': 'fWatZRp30XSwDGS'
            });
        expect(response.status).to.equal(200);
        expect(response.body['access_token']).to.exist;
        accessToken = response.body['access_token'];
    })

    it('POST /api/users/{profile} view user profile',async function () {
        const response = await request(server).post('/api/users/me')
            .send({
                'access_token': accessToken,
            })
        expect(response.status).to.equal(200);
    });


})

