var express = require('express');
var router = express.Router();
const MessCtrl = require('../../controllers/apiController/Mess.api.controller')
const multer = require('multer')
const storage = multer.memoryStorage();
const upload = multer({storage :  storage});

router.post('/send' , MessCtrl.CreateMess);
router.post('/file', upload.any('image') , MessCtrl.CreateMessWithFile);
router.get('/' , MessCtrl.getChats);
router.delete('/:id' , MessCtrl.deleteMess)

module.exports = router;