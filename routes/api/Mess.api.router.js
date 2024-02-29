var express = require('express');
var router = express.Router();
const MessCtrl = require('../../controllers/apiController/Mess.api.controller')
const multer = require('multer')
const storage = multer.memoryStorage();
const upload = multer({storage :  storage});

router.post('/send',  upload.any("image") , MessCtrl.CreateMess);

module.exports = router;