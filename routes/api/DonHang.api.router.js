var express = require('express');
var router = express.Router();
const DonHangCtrl = require('../../controllers/apiController/DonHang.api.controller');
router.get('/' , DonHangCtrl.GetAllDonHang);
//lấy đơn hàng theo id shop ///
router.get('/getShop/:id' , DonHangCtrl.getDonhangByidShop);
// lấy đơn hàng theo id shipper ///
router.get('/get-shipper/:id' , DonHangCtrl.getDonhangByidShipper);
//lấy đơn hàng theo id người dùng //
router.get('/get-nguoimua/:id' , DonHangCtrl.getDonhangByidNguoiMua);


module.exports = router;