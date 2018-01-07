//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // db.collection("Todos").findOneAndUpdate(
    //     { 
    //         _id: new ObjectID("5a52707a28544a0ef444546b")
    //     },{
    //         "$set":{
    //             completed: true
    //         }
    // },{
    //     returnOriginal:false
    // }).then((result)=>{
    //     console.log(result);
    // });
    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID("5a5270a828544a0ef4445475")
    },{
        "$set":{
            name: 'Giampiero'
        },
        "$inc":{
            age: 1
        }
    },
    {
        returnOriginal: false
    }
).then((result)=>{
        console.log(result);
    });
    // db.close();
});