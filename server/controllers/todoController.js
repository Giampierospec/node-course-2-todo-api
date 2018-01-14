var {TodoUtil} = require('../utils/todoUtil');
var TodoCtrl = (function(){
    var getTodos = (req, res) =>{

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