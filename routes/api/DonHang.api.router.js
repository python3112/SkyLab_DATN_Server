var express = require('express');
var router = express.Router();
const DonHangCtrl = require('../../controllers/apiController/DonHang.api.controller');

router.get('/' , DonHangCtrl.GetAllDonHang);

router.post('/add',DonHangCtrl.addDonHang);
router.post('/add-trang-thai/:id',DonHangCtrl.themTrangThai);


module.exports = router;