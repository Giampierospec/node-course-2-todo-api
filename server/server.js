var env = process.env.NODE_ENV || 'development';
console.log('env ******', env);
if(env === 'development'){
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
}
else if(env === 'test'){
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}
var express = require('express');
var bodyParser = require('body-parser');
var {mongoose} = require('./db/mongoose');
var {todoRoute} = require('./routes/todo');
var userRoute = require('./routes/user');

var app = express();


app.use(bodyParser.json());

app.use("/todos", todoRoute);
app.use('/users',userRoute);
var port = process.env.PORT;
app.set('port', port);

app.listen(app.get('port'),()=>{
    console.log(`App started on port ${app.get('port')}`);
});

module.exports = {app};