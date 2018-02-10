var {User} = require('../models/user');
var UserUtil = (function(){
    var postUser = (body, callback)=>{
        console.log(body);
        if(typeof body === 'object'){
            var user = new User({
                email: body.email,
                password: body.password
            });

            
            user.generateAuthToken().then((token)=>{
                callback(null, user, token);
            }).catch((e)=>callback(e));
        }
        else{
            var err = new Error('Body is not an object try again');
            callback(err);
        }
    };
    var getUserMe = (token, callback)=>{
        User.findByToken(token).then((user)=>{
            callback(null,user);
        }).catch((e)=> callback(e));
    };
    return {
        postUser,
        getUserMe
    };
})();

module.exports = {UserUtil};