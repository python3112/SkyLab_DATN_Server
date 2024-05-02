var express = require('express');
var router = express.Router();

// Đường dẫn tới home.controller.js
var userCtrl = require('../controllers/user.controller');
var checkLogin = require('../middlewares/validation');

// Vào trang home theo địa chỉ '/'
router.get('/',checkLogin.checkLogin,userCtrl.home);
router.get('/userActiveTrue',checkLogin.checkLogin,userCtrl.findUserTrue);
router.get('/userActiveFalse',checkLogin.checkLogin,userCtrl.findUserFales);
router.get('/queryUser',checkLogin.checkLogin,userCtrl.query);
router.get('/new',checkLogin.checkLogin,userCtrl.nguoiDungMoi);
// Xuất router
router.post('/update/:id',checkLogin.checkLogin,userCtrl.update);
module.exports = router;