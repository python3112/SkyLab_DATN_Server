const express = require('express');
const router = express.Router();
const multer = require('multer');
const {getStorage} = require('firebase/storage');
const accountController = require('../controllers/apiController/Account.api.controller');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
//---------Accounts API-------------------------
router.get('/accounts', accountController.listAccounts);
router.post('/accounts',upload.single('avata'), accountController.createAccount);
router.get('/accounts/:nameTk', accountController.getAccountByName);
router.get('/accounts/id/:id', accountController.getAccountById);
router.put('/accounts/:id', accountController.updateAccount);
router.put('/accounts/deactivate/:id', accountController.deactivateAccount);
// router.delete('/accounts/:id', accountController.deleteAccount);


module.exports = router;
