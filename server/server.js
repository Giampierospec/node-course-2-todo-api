var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');
var TodoSchema = new mongoose.Schema({
    text: { type: String },
    completed: { Boolean },
    completedAt: { type: Number }
});
//save new something
var Todo = mongoose.model('Todo', TodoSchema);

// var newTodo = new Todo({
//     text:'Cook dinner'
// });
// newTodo.save().then((doc)=>{
// console.log('Saved todo',doc);
// }, (e)=>{
//     console.log('Unable to save todo')
// });

var newTodo = new Todo({
    text:'Finish this tutorial',
    completed: false,
    completedAt:1
});
newTodo.save().then((doc)=>{
console.log('Saved todo',doc);
}, (e)=>{
    console.log('Unable to save todo')
});
