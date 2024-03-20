var express = require('express');
var router = express.Router();

// Đường dẫn tới home.controller.js
var userCtrl = require('../controllers/user.controller');


// Vào trang home theo địa chỉ '/'
router.get('/',userCtrl.home);

// Xuất router
module.exports = router;