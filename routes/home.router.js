var express = require('express');
var router = express.Router();

// Đường dẫn tới home.controller.js
var homeCtrl = require('../controllers/home.controller');


// Vào trang home theo địa chỉ '/'
router.get('/',homeCtrl.home);

// Xuất router
module.exports = router;