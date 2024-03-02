var express = require('express');
var router = express.Router();
const ChatCtrl = require('../../controllers/apiController/Chat.api.controller')

router.post('/create', ChatCtrl.CreateConverSation);

module.exports = router