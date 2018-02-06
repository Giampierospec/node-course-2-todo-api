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
    return {
        postUser
    };
})();

module.exports = Ctrl;