//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');
var obj = new ObjectID();
console.log(obj);
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db)=>{
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    // db.collection('Todos').insertOne({
    //     text:'Something to do',
    //     completed: false
    // }, (err, result)=>{
    //     if(err){
    //         return console.log('Unable to insert Todo', err);
    //     }
    //     console.log(JSON.stringify(result.ops,null,2));
    // });

    // db.collection('Users').insertOne({
    //     name:'Giampiero Specogna',
    //     age: 22,
    //     location: 'Santo Domingo, Dominican Republic'
    // },(err, result)=>{
    //     if(err)
    //         return console.log('Unable to insert User', err);
    //     console.log(JSON.stringify(result.ops,null,2));
    // });
    db.close();
});