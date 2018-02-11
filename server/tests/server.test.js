

const expect = require('expect');
const {ObjectID} = require('mongodb');
const request = require('supertest');
const {User} = require('../models/user');
const {app} = require('../server');
const {Todo} = require('../models/todo');
const {todos,populateTodos,users,populateUsers} = require('./seed/seed');
beforeEach(populateUsers);
beforeEach(populateTodos);
describe('POST /todos', ()=>{
    it('should create a new todo', (done)=>{
        var text = 'Test todo text';

        request(app)
         .post('/todos')
         .send({
             text
         })
         .expect(200)
         .expect((res)=>{
                expect(res.body.text).toBe(text);
         })
         .end((err, res)=>{
             if(err){
                return done(err);
             }
             Todo.find({text}).then((todos)=>{
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
             }).catch((e)=> done(e));
         });
    });
    it('should not create todo with invalid body data', (done)=>{
        request(app)
             .post('/todos')
             .send({})
             .expect(400)
             .end((err, res)=>{
                 if(err){
                     return done(err);
                 }
                 Todo.find().then((todos)=>{
                     expect(todos.length).toBe(todos.length);
                    done();
                 }).catch((e) => done(e));;
             });
             
    });
});

describe(' GET /todos',()=>{
    it('should get all todos', (done)=>{
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res)=>{

                expect(res.body.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET /todos/:id', ()=>{
    it('should return todo by Id',(done)=>{
        var hexId = todos[0]._id.toHexString();
        request(app)
             .get(`/todos/${hexId}`)
             .expect(200)
             .expect((res)=>{
                 expect(res.body.todo.text).toBe(todos[0].text);
             })
             .end(done);
    });
});

describe('DELETE /todos/:id', ()=>{
    it('should remove a todo', (done)=>{
        var hexId = todos[1]._id.toHexString();
        request(app)
         .delete(`/todos/${hexId}`)
         .expect(200)
         .expect((res)=>{
             expect(res.body.todo._id).toBe(hexId);
         })
         .end((err, res)=>{
             if(err)
              return done(err);
              Todo.findById(hexId).then((todo)=>{
                    expect(todo).toNotExist();
                    return done();
              }).catch((e)=>{
                  return done(err);
              });
         });
    });
    it('should return 404 if todo not found',(done)=>{
        request(app)
            .delete(`/todos/${todos[0]._id.toHexString()}`)
            .expect(404)
            .expect((res) => {
                expect(res.body.text).toBe(todos[0].text);
            })
            .end(done);
    });
    it('should return 404 if objectId is invalid', (done)=>{
        request(app)
            .delete(`/todos/${todos[0]._id.toHexString()}`)
            .expect(404)
            .expect((res) => {
                expect(res.body.text).toBe(todos[0].text);
            })
            .end(done);
    });
});

describe('GET /users/me',()=>{
    it('should return user if authenticated', (done)=>{
        request(app)
         .get('/users/me')
         .set('x-auth',users[0].tokens[0].token)
         .expect(200)
         .expect((res)=>{
             expect(res.body.user._id).toBe(users[0]._id.toHexString());
             expect(res.body.user.email).toBe(users[0].email);
         }).end(done);
    });
    it('should return 401 if not authenticated', (done)=>{
        request(app)
            .get('/users/me')
            .expect(401)
            .expect((res) => {
                expect(res.body).toEqual({});
            }).end(done);
    });
});

describe('POST /users/', ()=>{
    it('should create an User', (done)=>{
        var email = 'example@example.com';
        var password = '123mb!';
        request(app)
           .post('/users')
           .send({email, password})
           .expect(200)
           .expect((res)=>{
               expect(res.header['x-auth']).toExist();
               expect(res.body.user._id).toExist();
               expect(res.body.user.email).toBe(email);
           }).end(done);
    });
describe('POST /users/login', ()=>{
    it('should login user and return auth token',(done)=>{
        request(app)
          .post('/users/login')
          .send({
              email: users[1].email,
              password: users[1].password
          }).expect(200)
          .expect((res)=>{
              expect(res.headers['x-auth']).toExist();
          }).end((err, res)=>{
              if(err)
               return done(err);
               User.findById(users[1]._id).then((user)=>{
                    expect(user.tokens[0]).toInclude({
                        access:'auth',
                        token: res.headers['x-auth']
                    });
                    done();
               }).catch((e)=> done(e));
          })
    });
});
// describe('DELETE /users/me/token',()=>{
//     it('should remove auth token on logout',(done)=>{
//         //DELETE /users/me token
//         //set x-auth equal to token
//         //200
//     });
// });
// });