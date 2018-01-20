var {Todo} = require('../models/todo');
/**
 * function that returns CRUD operations in todos
 */
var TodoUtil = (()=>{
    var getTodos = (callback)=>{
        Todo.find({}).then((todos)=>{
            callback(null, {todos});
        }, (err)=>{
            callback(err);
        });
    };
    var createTodo = (body, callback)=>{
        if(typeof body === 'object'){
            var todo = new Todo({
                text: body.text
            });
            todo.save().then((doc) => {
                callback(null,doc);
            }, (err) => {
                callback(err);
            });
        }
        else{
            var err = new Error('body is not an object try again');
            callback(err);
        }
    };
    return {
        createTodo,
        getTodos
    };
})();

module.exports = {TodoUtil};