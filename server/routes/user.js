var express = require('express');
var UserCtrl = require('../controllers/userController');
var router = express.Router();
router.route('/')
      .post(UserCtrl.postUser);
router.route('/me')
      .get(UserCtrl.authenticate,UserCtrl.userMe);
router.route('/login')
      .post(UserCtrl.login);

router.route('/me/token')
      .delete(UserCtrl.authenticate, UserCtrl.logout);

module.exports = router;