var express = require('express');
var UserCtrl = require('../controllers/userController');
var router = express.Router();
router.route('/')
      .post(UserCtrl.postUser);

module.exports = router;