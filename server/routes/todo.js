var express = require('express');
var {TodoCtrl} = require('../controllers/todoController');
var todoRoute = express.Router();

todoRoute.route('/')
    .post(TodoCtrl.postTodos)
    .get(TodoCtrl.getTodos);


module.exports = {todoRoute};