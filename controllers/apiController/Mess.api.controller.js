var Account = require('../../models/Account');
var Message = require('../../models/Mess');
const { uploadImages, deleteImage } = require('../../middlewares/upload.image.firebase');
const { realtimeDatabase } = require('../../middlewares/firebase.config');
const moment = require('moment');
const { database } = require('firebase-admin');
const nameFolder = 'Message';

exports.CreateMess = async (req, res) => {
    try {

        const { idNguoiGui, content, idChat } = req.body
        console.log(req.body)
        const newMessageRef = await realtimeDatabase.ref('/messages').push();
        newMessageRef.set({
            idChat: idChat,
            idAccount: idNguoiGui,
            content: content,
            AnhTinNhan: [],
            Daxem: false,
            ThuHoi: false,
            thoiGian: moment(Date.now()).format('DD-MM-YYYY HH:mm:ss')
        });

        return res.json(newMessageRef);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }


}
exports.CreateMessWithFile = async (req, res) => {
    try {


        const { idNguoiGui, content, idChat } = req.body
        const files = req.files;
        console.log(req.files);
        if (!files) {

            return;
        }
        const images = await uploadImages(files, nameFolder);

        const newMessageRef = await realtimeDatabase.ref('/messages').push();
        newMessageRef.set({
            idChat: idChat,
            idAccount: idNguoiGui,
            content: content,
            AnhTinNhan: [images],
            Daxem: false,
            ThuHoi: false,
            thoiGian: moment(Date.now()).format('DD-MM-YYYY HH:mm:ss')
        });
        return res.json(newMessageRef);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }


}

exports.getChats = async (req, res) => {
    try {
        const { idChat } = req.body
        var lisyChat = [];
        const check = await realtimeDatabase.ref('/messages')
            .orderByChild('idChat')
            .equalTo(idChat)
            .once('value')
        if (check.exists()) {
            lisyChat = check.val();
        }
        return res.json(lisyChat)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}
exports.putSeen = async(req , res ) =>{
    try {
        const { listIdMess } = req.body;

        for (let index = 0; index < listIdMess.length; index++) {
            const element = listIdMess[index];
            await realtimeDatabase.ref('/messages/' + element + '/Daxem').set(true);
        }
        return res.json({ msg: "Tất cả tin nhắn đã được đánh dấu là đã xem!" });
    } catch (error) {
        
    }
}

exports.revokeMess = async(req , res ) =>{
    try {
            await realtimeDatabase.ref('/messages/' + req.params.id + '/ThuHoi').set(true);
        return res.json({ msg: "Tất cả tin nhắn đã được đánh dấu là đã xem!" });
    } catch (error) {
        
    }
}


exports.deleteMess = async (req, res, next) => {
    try {
        await realtimeDatabase.ref('/messages/' + req.params.id).remove();
        return res.json({ msg: "Tất cả tin nhắn đã được đánh dấu là đã xem!" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }


}
