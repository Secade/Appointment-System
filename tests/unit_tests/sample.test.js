//const mongoose = require('mongoose');
//const user = require('../model/account');
const{ sum } = require('../../model/sample');
//const { describe } = require('yargs');
//const { exportAllDeclaration } = require('@babel/types');
//const userData = {username: 'Kristen', password:'1234password', accountType:'dentist', salt:'1234password'}


//TODO: Write unit tests

describe('Adding', ()=>{
    it('1 + 2 equal 3', ()=>{
        let a = 1;
        let b = 2;
        
        let ans = sum(a,b);

        expect(ans).toBe(3);
    });
});

// describe('Checks if I can add an account', ()=>{
//     beforeAll(async () =>{
//         await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useCreateIndex: true}, (err)=>{
//             if(err){
//                 console.error(err);
//                 process.exit(1);
//             }
//         });
//     });
//     it('For trial', () => {
//         const validUser = new UserModel(userData);
//     });
// });

