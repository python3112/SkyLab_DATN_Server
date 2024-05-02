var express = require('express');
var router = express.Router();


var khuyenmaiCtrl = require('../controllers/khuyenmai.controller');
var checkLogin = require('../middlewares/validation');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/',checkLogin.checkLogin,khuyenmaiCtrl.home);
router.get('/search',checkLogin.checkLogin,khuyenmaiCtrl.search);
// router.post('/addKhuyenMai',upload.single('file'), khuyenmaiCtrl.postHangSxView);
router.get('/addKhuyenMai',checkLogin.checkLogin, (res,req,next)=>{
    req.redirect('/', khuyenmaiCtrl.home)
})
router.post('/update/:id',checkLogin.checkLogin,upload.single('file'), khuyenmaiCtrl.update);
router.post('/addKhuyenMai',checkLogin.checkLogin,upload.single('file'), khuyenmaiCtrl.addKhuyenMai)
// Xuất router
module.exports = router;