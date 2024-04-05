var express = require('express');
var router = express.Router();
const MessCtrl = require('../../controllers/apiController/Mess.api.controller')
const {realtimeDatabase} =require('../../middlewares/firebase.config')
const multer = require('multer')
const storage = multer.memoryStorage();
const upload = multer({storage :  storage});


router.post('/send' , MessCtrl.CreateMess);
router.post('/file', upload.any('image') , MessCtrl.CreateMessWithFile);
router.get('/' , MessCtrl.getChats);
router.put('/seen/:id' , MessCtrl.putSeen);
router.put('/revoke/:id' ,MessCtrl.revokeMess);
router.delete('/:id' , MessCtrl.deleteMess)

// Thực hiện theo dõi thay đổi trong cơ sở dữ liệu




module.exports = router;