var express = require('express');
var {TodoCtrl} = require('../controllers/todoController');
var UserCtrl = require('../controllers/userController');
var todoRoute = express.Router();


todoRoute.route('/')
    .post(UserCtrl.authenticate,TodoCtrl.postTodos)
    .get(UserCtrl.authenticate,TodoCtrl.getTodos);
todoRoute.route('/:id')
         .get(UserCtrl.authenticate,TodoCtrl.getTodo)
         .delete(UserCtrl.authenticate, TodoCtrl.deleteTodo)
         .patch(UserCtrl.authenticate, TodoCtrl.updateTodo);

module.exports = {todoRoute};