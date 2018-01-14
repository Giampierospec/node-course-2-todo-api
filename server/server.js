var express = require('express');
var bodyParser = require('body-parser');
var {mongoose} = require('./db/mongoose');
var {todoRoute} = require('./routes/todo');


var app = express();


app.use(bodyParser.json());

app.use("/todos", todoRoute);
var port = process.env.PORT || 3000;
app.set('port', port);

app.listen(app.get('port'),()=>{
    console.log(`App started on port ${app.get('port')}`);
});