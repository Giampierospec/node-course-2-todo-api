require('./config/config');
var express = require('express');
var bodyParser = require('body-parser');
var {mongoose} = require('./db/mongoose');
var {todoRoute} = require('./routes/todo');
var userRoute = require('./routes/user');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();


app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret:"123ABC$",
    saveUninitialized: true,
    resave: false
}));
app.use("/todos", todoRoute);
app.use('/users',userRoute);
var port = process.env.PORT;
app.set('port', port);

app.listen(app.get('port'),()=>{
    console.log(`App started on port ${app.get('port')}`);
});

module.exports = {app};