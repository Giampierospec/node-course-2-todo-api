const {mongoose} = require('../server/db/mongoose');
const {ObjectID} = require('mongodb');

const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');
var id = "5a6355b2d5f766343627ba78";
var idUser = '5a5a1a74d67a58300a130834'
if(!ObjectID.isValid(id)){
    console.log('ID not valid');
}

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos',todos);
// });

// Todo.findOne({_id: id}).then((todo)=>{
//     console.log('Todo', todo);
// });

// Todo.findById(id).then((todo)=>{
//     if(!todo)
//       return console.log('Id not found');
//     console.log('Todo By Id', todo);
// }).catch((err)=> console.log(err));

User.find({
    _id: idUser
}).then((users) => console.log('Users', users));

User.findOne({
    _id: idUser
}).then((user)=> {
    if(!user)
        return console.log('User not found');
    console.log('User',user);
}).catch((e)=> console.log(e));

User.findById(idUser).then((user)=> {
    if(!user)
     return console.log('Id not found');
    console.log('User by Id', user);
}).catch((e)=> console.log(e));

