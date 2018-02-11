var {UserUtil} = require('../utils/userUtil');
var _ = require('lodash');

var Ctrl = (function(){
    var postUser = (req, res, next)=>{
        var body = _.pick(req.body,['email','password']);
        UserUtil.postUser(body,(err, user, token)=>{
            if(err)
             return res.status(400).send({err});
            else
              res.header('x-auth',token).send({user});
        })
    };
    var userMe = (req, res, next)=>{
        res.json({user:req.user});
    };

    var authenticate = (req, res, next)=>{
        var token = req.header('x-auth');
        UserUtil.getUserMe(token,(err,user)=>{
            if(err)
             return res.status(401).send({err});
            req.user = user;
            req.token = token;
            next();
        });
    };
    var login = (req,res, next)=>{
        UserUtil.loginUser(req.body.email, req.body.password, (err, user, token)=>{
            console.log(user);
            if (err)
                return res.status(400).send({err});
            else
                res.header('x-auth', token).send({user});
        });
        
    };
    var logout = (req, res)=>{
        UserUtil.logoutUser(req.user,req.token,(err, user)=>{
            if(err)
              return res.status(400).send({err});
            else
              res.json({});
        });
    };
    return {
        postUser,
        userMe,
        authenticate,
        login,
        logout
    };
})();

module.exports = Ctrl;