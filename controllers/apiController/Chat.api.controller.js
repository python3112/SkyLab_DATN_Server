
const { realtimeDatabase, admin } = require('../../middlewares/firebase.config');
const moment = require('moment');

exports.GetChats = async (req, res) => {

    try {
        // Khai báo một mảng để lưu trữ các chat
        const chats = [];

        // Sử dụng once() để lấy dữ liệu chat hiện có một lần
        const snapshot = await realtimeDatabase.ref('/Chat').once('value');
        snapshot.forEach((childSnapshot) => {
            const chat = childSnapshot.val();
            chats.push(chat);
        });

        // Gửi phản hồi sau khi đã thu thập đủ dữ liệu
        return res.json(chats);
    } catch (error) {
        return res.status(500).json({ message: error.message });

    }
}


exports.CreateConverSation = async (req, res) => {
    try {
        const { idNguoiGui } = req.body
        const check = await realtimeDatabase.ref('/Chat')
            .orderByChild('Nguoigui')
            .equalTo(req.params.id)
            .once('value');
        if (check.exists()) {
            
            const checkKey = Object.keys(check.val())[0];
            return res.status(206).json({ key: checkKey });
        } else {

            const newMessageRef = await realtimeDatabase.ref('/Chat').push();
            const newMessageKey = newMessageRef.key; // Lấy key mới tạo
            newMessageRef.set({
                Nguoigui: req.params.id,
                ThuHoi: false,
                ngay: moment(Date.now()).format('DD-MM-YYYY HH:mm:ss')
            });
            return res.json({ key: newMessageKey });
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
exports.RevokeChat = async (req, res) => {
    try {
        await realtimeDatabase.ref('/Chat/' + req.params.id + '/ThuHoi').set(true);
        return res.json({ msg: "Thu Hồi Thành Công !" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}