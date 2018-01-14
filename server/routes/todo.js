var express = require('express');
var {TodoCtrl} = require('../controllers/todoController');
var todoRoute = express.Router();

todoRoute.route('/')
    .post(TodoCtrl.postTodos);


module.exports = {todoRoute};