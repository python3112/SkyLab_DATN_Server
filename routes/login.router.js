var express = require('express');
var router = express.Router();
var loginCtrl  = require('../controllers/login.controller');


// Vào trang home theo địa chỉ '/'
router.get('/',loginCtrl.login)
router.post('/' ,loginCtrl.login);
// Xuất router
module.exports = router;