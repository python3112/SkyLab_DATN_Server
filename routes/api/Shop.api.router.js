var express = require('express');
var router = express.Router();
const ShopCtrl = require('../../controllers/apiController/Shop.api.controller');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.get('/:id', ShopCtrl.getShopById);
router.post('/add/:id',upload.single('image'),ShopCtrl.createShop);
router.put('/edit-ten/:id', ShopCtrl.editTenShop);
router.put('/edit-sdt/:id', ShopCtrl.editSdt);
router.put('/edit-dia-chi/:id',ShopCtrl.editDiaChi);
router.put('/edit-trang-thai/:id', ShopCtrl.editTrangThai);
router.put('/edit-avatar/:id', upload.single('image'), ShopCtrl.editAvatar);
router.get('/dia-chi/:id',ShopCtrl.getDiaChi);
// router.put('/edit-dia-chi/:id/:diaChiId',ShopCtrl.suaDiaChiTheoId);

module.exports = router;