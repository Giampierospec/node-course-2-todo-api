var {Todo} = require('../models/todo');
/**
 * function that returns CRUD operations in todos
 */
var TodoUtil = (()=>{
    var getTodos = (callback)=>{
        Todo.find({}).then((todos)=>{
            callback(null, todos);
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
    var findTodo = (id, callback)=>{
            Todo.findById(id).then((todo)=>{
                callback(null,todo);
            },(err)=>{
                callback(err);
            });
    };
    var updateTodo = (id, body,callback)=>{
        Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
            callback(null,todo);
        }).catch((e)=> callback(e));

    };
    var deleteTodo = (id, callback) =>{
        Todo.findByIdAndRemove(id).then((todo)=>{
            callback(null, todo);
        }, (err)=>{
            callback(err);
        });
    };
    return {
        createTodo,
        getTodos,
        findTodo,
        deleteTodo,
        updateTodo
    };
})();

module.exports = {TodoUtil};