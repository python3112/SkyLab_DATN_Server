var express = require('express');
var router = express.Router();

// Đường dẫn tới home.controller.js
var userCtrl = require('../controllers/user.controller');
var checkLogin = require('../middlewares/validation');

// Vào trang home theo địa chỉ '/'
router.get('/',checkLogin.checkLogin,userCtrl.home);
router.get('/userActiveTrue',userCtrl.findUserTrue);
router.get('/userActiveFalse',userCtrl.findUserFales);
router.get('/queryUser',userCtrl.query);
// Xuất router
module.exports = router;