var express = require('express');
var router = express.Router();
const ChatCtrl = require('../../controllers/apiController/Chat.api.controller');


router.get('/', ChatCtrl.GetChats);
router.post('/create', ChatCtrl.CreateConverSation);
router.put('/revoke/:id' , ChatCtrl.RevokeChat);
module.exports = router