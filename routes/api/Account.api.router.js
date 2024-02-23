<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const accountController = require('../../controllers/apiController/Account.api.controller');
//---------Accounts API-------------------------
router.get('/accounts', accountController.listAccounts);
router.post('/accounts', accountController.createAccount);
router.get('/accounts/:nameTk', accountController.getAccountByName);
router.get('/accounts/id/:id', accountController.getAccountById);
router.put('/accounts/:id', accountController.updateAccount);
router.put('/accounts/deactivate/:id', accountController.deactivateAccount);
=======
var express = require('express');
var router = express.Router();
const AccountCtrl = require('../../controllers/apiController/Account.api.controller');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.get('/', AccountCtrl.getAllAccount);
router.get('/:id', AccountCtrl.getAccountById);
router.post('/sign-up', AccountCtrl.signUp);
router.post('/sign-in', AccountCtrl.signIn);
router.put('/edit-ho-ten/:id', AccountCtrl.editHoTen);
router.put('/edit-mat-khau/:id', AccountCtrl.editMatKhau);
router.put('/edit-sdt/:id', AccountCtrl.editSdt);
router.put('/edit-email/:id', AccountCtrl.editEmail);
router.put('/edit-trang-thai/:id', AccountCtrl.editTrangThai);
router.put('/edit-avatar/:id', upload.single('image'), AccountCtrl.editAvatar);
router.get('/dia-chi/:id',AccountCtrl.getDiaChiTheoAccount);
router.post('/add-dia-chi/:id',AccountCtrl.themDiaChi);
router.put('/edit-dia-chi/:id/:diaChiId',AccountCtrl.suaDiaChiTheoId);

>>>>>>> f5a6fe0395111087804b87cc850084380f45ce7f
module.exports = router;