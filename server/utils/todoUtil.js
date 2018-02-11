var {Todo} = require('../models/todo');
/**
 * function that returns CRUD operations in todos
 */
var TodoUtil = (()=>{
    var getTodos = (user,callback)=>{
        Todo.find({
            _creator: user._id
        }).then((todos)=>{
            callback(null, todos);
        }, (err)=>{
            callback(err);
        });
    };
    var createTodo = (body, user,callback)=>{
        if(typeof body === 'object'){
            var todo = new Todo({
                text: body.text,
                _creator: user._id
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
    var findTodo = (id,user, callback)=>{
            Todo.findOne({
                _id: id,
                _creator: user._id
            }).then((todo)=>{
                callback(null,todo);
            },(err)=>{
                callback(err);
            });
    };
    var updateTodo = (id,user, body,callback)=>{
        Todo.findOneAndUpdate({_id:id,_creator:user._id},{$set:body},{new:true}).then((todo)=>{
            callback(null,todo);
        }).catch((e)=> callback(e));

    };
    var deleteTodo = (id, user,callback) =>{
        Todo.findOneAndRemove({
            _id: id,
            _creator: user._id
        }).then((todo)=>{
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