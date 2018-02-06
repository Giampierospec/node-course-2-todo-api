const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
// bcrypt.genSalt(10,(err, salt)=>{
//     bcrypt.hash(password, salt,(err, hash)=>{
//         console.log(hash);
//     });
// });
var password = '123abc!';
var hashedPassword = '$2a$10$I667PV2JF/pu8wHB1ayPRut.Ry3dvvC3GBtUzV2X8iMLv4GORllXe';

bcrypt.compare(password,hashedPassword,(err, res)=>{
    console.log(res);
})

var data = {
    id: 10
};
var token = jwt.sign(data,'123abc');

console.log(token);

var decoded = jwt.verify(token,'123abc');
console.log('decoded', decoded);

// var message = 'I am user number 3';
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
//     id: 4
// };

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data)+ 'someSecret').toString()
// };

// var resultHash = SHA256(JSON.stringify(token.data)+'someSecret').toString();
// if(resultHash === token.hash){
//     console.log('Data was not changed');
// }
// else{
//     console.log('Data was changed dont trust');
// }