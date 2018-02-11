var {TodoUtil} = require('../utils/todoUtil');
var {ObjectID} = require('mongodb');
const _ = require('lodash');
var TodoCtrl = (function(){
    var getTodos = (req, res) =>{
        TodoUtil.getTodos(req.user,(err, todos)=>{
            if(err)
                res.status(400).send(err);
            else
             res.json(todos);
        });
    };
    var postTodos = (req,res, next)=>{
       TodoUtil.createTodo(req.body,req.user,(err,todo)=>{
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
        TodoUtil.deleteTodo(id,req.user,(err,todo)=>{
            if(!todo)
             return res.status(404).send();
             if(err)
              return res.status(400).send();
            return res.json({todo});
        });
    };
var getTodo = (req, res, next)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    
    TodoUtil.findTodo(id,req.user,(err, todo)=>{
        if(!todo)
        res.status(404).send();
        if(todo)
         res.json({todo});
         if(err)
          res.status(400).send();
    });
};
var updateTodo = (req, res, next)=>{
    var id = req.params.id;
    var body = _.pick(req.body,['text','completed']);
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }
    else{
        body.completed = false;
        body.completedAt = null;
    }
    TodoUtil.updateTodo(id,req.user,body,(err, todo)=>{
        if(err)
            return res.status(400).send();
        if(!todo)
            return res.status(404).send();
        return res.json({todo});
    });
};
    return {
        postTodos,
        getTodos,
        getTodo,
        deleteTodo,
        updateTodo
    };
})();

module.exports = {TodoCtrl};