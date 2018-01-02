//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    // db.collection('Todos').find({completed: false}).toArray().then((docs)=>{
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, null,2));
    // }, (err)=>{
    //     console.log('Unable to fetch todos', err);
    // });
    // db.collection('Todos').count().then((count)=>{
    //     console.log(`Todos Count: ${count}`);
    // },(err)=>{
    //     console.log('Unable to count');
    // });
    db.collection('Users').find({name:'Giampiero Specogna'}).toArray().then((doc)=>{
        console.log(JSON.stringify(doc,null,2));
    }, (err)=>{
        console.log('Unable to fetch name',err);
    });
    db.close();
});