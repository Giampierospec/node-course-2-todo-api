var express = require('express');
var UserCtrl = require('../controllers/userController');
var router = express.Router();
router.route('/')
      .post(UserCtrl.postUser);
router.route('/me')
      .get(UserCtrl.authenticate,UserCtrl.userMe);

module.exports = router;