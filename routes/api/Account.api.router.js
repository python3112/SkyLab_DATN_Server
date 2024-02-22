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
module.exports = router;