var {TodoUtil} = require('../utils/todoUtil');
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

    return {
        postTodos,
        getTodos
    };
})();

module.exports = {TodoCtrl};