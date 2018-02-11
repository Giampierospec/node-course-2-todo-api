var express = require('express');
var UserCtrl = require('../controllers/userController');
var router = express.Router();
router.route('/')
      .post(UserCtrl.postUser);
router.route('/me')
      .get(UserCtrl.authenticate,UserCtrl.userMe);
router.route('/login')
      .post(UserCtrl.login);

module.exports = router;