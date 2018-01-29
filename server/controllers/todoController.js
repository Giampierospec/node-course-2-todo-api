var {TodoUtil} = require('../utils/todoUtil');
var {ObjectID} = require('mongodb');
var TodoCtrl = (function(){
    var getTodos = (req, res) =>{
        TodoUtil.getTodos((err, todos)=>{
            if(err)
                res.status(400).send(err);
            else
             res.json(todos);
        });
    };
    var postTodos = (req,res, next)=>{
       TodoUtil.createTodo(req.body,(err,todo)=>{
        if(!err){
            res.json(todo);
        }
        else{
            res.status(400).send(err);
        }
       });
    };
    var deleteTodo = (req, res, next)=>{
        var id = req.params.id;
        if(!ObjectID.isValid(id)){
            return res.status(404).send();
        }
        TodoUtil.deleteTodo(id,(err,todo)=>{
            if(!todo)
             return res.status(404).send();
             if(err)
              return res.status(400).send();
            return res.json(todo);
        });
    };
var getTodo = (req, res, next)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    
    TodoUtil.findTodo(id,(err, todo)=>{
        if(!todo)
        res.status(404).send();
        if(todo)
         res.json(todo);
         if(err)
          res.status(400).send();
    });
};
    return {
        postTodos,
        getTodos,
        getTodo,
        deleteTodo
    };
})();

module.exports = {TodoCtrl};