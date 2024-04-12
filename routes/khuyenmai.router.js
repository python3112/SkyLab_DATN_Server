var express = require('express');
var router = express.Router();


var khuyenmaiCtrl = require('../controllers/khuyenmai.controller');
var checkLogin = require('../middlewares/validation');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/',checkLogin.checkLogin,khuyenmaiCtrl.home);
router.get('/search',khuyenmaiCtrl.search);
// router.post('/addKhuyenMai',upload.single('file'), khuyenmaiCtrl.postHangSxView);
router.get('/addKhuyenMai', (res,req,next)=>{
    req.redirect('/', khuyenmaiCtrl.home)
})
router.post('/addKhuyenMai',upload.single('file'), khuyenmaiCtrl.addKhuyenMai)
// Xuất router
module.exports = router;