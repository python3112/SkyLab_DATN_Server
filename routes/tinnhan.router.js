var express = require('express');
var router = express.Router();

// Đường dẫn tới home.controller.js
var tinnhanCtrl = require('../controllers/tinnhan.controller');


// Vào trang home theo địa chỉ '/'
router.get('/',tinnhanCtrl.home);

// Xuất router
module.exports = router;