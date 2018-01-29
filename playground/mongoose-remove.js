const { mongoose } = require('../server/db/mongoose');
const { ObjectID } = require('mongodb');

const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

// Todo.remove({}).then((result)=>{
//     console.log(result);
// });

//Todo.findOneAndRemove({})

//Todo.findByIdAndRemove

Todo.findByIdAndRemove('5a6f21e89bd12f7012bde7ad').then((todo)=>{
    console.log(todo);
});