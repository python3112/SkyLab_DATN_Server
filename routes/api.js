const express = require('express');
const router = express.Router();
const accountController = require('../controllers/apiController/Account.api.controller');
const sanPhamController = require('../controllers/apiController/SanPham.api.controller');
const theloaiSpController = require('../controllers/apiController/TheloaiSp.api.controller');
const { validateSanPham,validateTheloaiSp } = require('../middlewares/validation');



//---------Accounts API-------------------------
router.get('/accounts', accountController.listAccounts);
router.post('/accounts', accountController.createAccount);
router.get('/accounts/:nameTk', accountController.getAccountByName);
router.get('/accounts/id/:id', accountController.getAccountById);
router.put('/accounts/:id', accountController.updateAccount);
router.put('/accounts/deactivate/:id', accountController.deactivateAccount);

//---------SanPham API-------------------------
router.get('/sanpham', sanPhamController.listSanPham);
router.post('/sanpham', validateSanPham, sanPhamController.createSanPham);
router.get('/sanpham/:id', sanPhamController.getSanPhamById);
router.put('/sanpham/:id', validateSanPham, sanPhamController.updateSanPham);
router.delete('/sanpham/:id', sanPhamController.deleteSanPham);

// ---------TheloaiSp API-------------------------
router.get('/theloaisp', theloaiSpController.listTheloaiSp);
router.post('/theloaisp', validateTheloaiSp, theloaiSpController.createTheloaiSp);
router.get('/theloaisp/:id', theloaiSpController.getTheloaiSpById);
router.put('/theloaisp/:id', validateTheloaiSp, theloaiSpController.updateTheloaiSp);
router.delete('/theloaisp/:id', theloaiSpController.deleteTheloaiSp);


module.exports = router;
