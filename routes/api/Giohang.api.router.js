var express = require('express');
var router = express.Router();
const GiohangCtrl = require('../../controllers/apiController/GioHang.api.controller');

router.get('/:id' , GiohangCtrl.getGioHangByIdAccount);
router.get('/gioHang/:id' , GiohangCtrl.getGioHangByIdGioHang);
router.post('/add' , GiohangCtrl.addGioHang);
router.put('/edit-soLuong/:id' , GiohangCtrl.editSoLuongSanPham);
router.delete('/delete/:id',GiohangCtrl.deleteGioHang);

module.exports = router;