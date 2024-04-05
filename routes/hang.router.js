var express = require('express');
var router = express.Router();

// Đường dẫn tới home.controller.js
var hangCtrl = require('../controllers/hang.controller');
var hangCtrlApi = require('../controllers/apiController/HangSx.api.controller');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Vào trang home theo địa chỉ '/'
router.get('/',hangCtrl.home);
router.get('/search',hangCtrl.search);
router.post('/addHangSX',  upload.single('file'), hangCtrlApi.postHangSxView);
router.get('/addHangSX', (res,req,next)=>{
    req.redirect('/', hangCtrl.home)
})
module.exports = router;