var express = require('express');
var router = express.Router();
const sanPhamYTCtrl = require('../../controllers/apiController/SanPhamYT.api.controller');

// List danh sách sản phẩm yêu thích theo idAcount
router.get('/:id', sanPhamYTCtrl.getByIdAccount);

// Lấy trạng thái đã yêu thích chưa để hiện thị tym đỏ hay trong suốt 
// khi mới vào màn hình sản phẩm
router.post('/check/', sanPhamYTCtrl.checkYeuThich);

// Thêm và xóa sản phẩm yêu thích khi ở màn hình sản phẩm
router.post('/', sanPhamYTCtrl.addYeuThich);

// Xóa sản phẩm yêu thích ở màn hình danh sách
router.delete('/delete/:id',sanPhamYTCtrl.deleteById);

module.exports = router;
