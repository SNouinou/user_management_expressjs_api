import {expect} from 'chai';
import config from  'config';
import server, {port} from '../src/index';
console.log(port)

describe('Server', ()=>{
    it('tests that server is running current port', async()=>{
        expect(port).to.equal(config.get('port'))
   
    })
});