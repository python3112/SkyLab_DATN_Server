
var express = require('express');
var router = express.Router();
const GiohangCtrl = require('../../controllers/apiController/GioHang.api.controller');

router.get('/spGioHang' , GiohangCtrl.GetSpGioHang);
// lấy giỏ hàng với id người mua //// 
router.get('/:id' , GiohangCtrl.getGioHangbyId);
router.post('/' , GiohangCtrl.createGioHang);
router.put('/edit-list-sp/:id' , GiohangCtrl.updateListSp);




module.exports = router;