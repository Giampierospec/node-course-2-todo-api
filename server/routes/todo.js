var express = require('express');
var {TodoCtrl} = require('../controllers/todoController');
var todoRoute = express.Router();

todoRoute.route('/')
    .post(TodoCtrl.postTodos)
    .get(TodoCtrl.getTodos);
todoRoute.route('/:id')
         .get(TodoCtrl.getTodo)
         .delete(TodoCtrl.deleteTodo);

module.exports = {todoRoute};