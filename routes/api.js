const express = require('express');
const router = express.Router();
const accountController = require('../controllers/apiController/Account.api.controller');

//---------Accounts API-------------------------
router.get('/accounts', accountController.listAccounts);
router.post('/accounts', accountController.createAccount);
router.get('/accounts/:nameTk', accountController.getAccountByName);
router.get('/accounts/id/:id', accountController.getAccountById);
router.put('/accounts/:id', accountController.updateAccount);
router.put('/accounts/deactivate/:id', accountController.deactivateAccount);
router.delete('/accounts/:id', accountController.deleteAccount);

module.exports = router;
