
const {realtimeDatabase , admin} = require('../../middlewares/firebase.config');
const moment = require('moment');

exports.GetChats = async(req , res) =>{

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
exports.CreateConverSation = async(req , res) =>{
    try {
      const {idNguoiGui , idNguoiNhan} = req.body
      const check =  await realtimeDatabase.ref('/Chat')
      .orderByChild('Nguoigui')
      .equalTo(idNguoiGui)
      .once('value');
      let existingChatId = null;

      check.forEach((childSnapshot) => {
          const chatData = childSnapshot.val();
          if (chatData.NguoiNhan === idNguoiNhan) {
              existingChatId = childSnapshot.key;
              return true; // Dừng vòng lặp khi tìm thấy cặp người gửi và người nhận tương tự
          }
      });
      if (existingChatId) {
        // Nếu đã tồn tại dữ liệu, trả về id của item đó
        return res.status(400).json({ check :  existingChatId });
      }else{
      const newMessageRef = await realtimeDatabase.ref('/Chat').push();
      newMessageRef.set({
        Nguoigui :  idNguoiGui,
        NguoiNhan : idNguoiNhan,
        ThuHoi:false,
        ngay: moment(Date.now()).format('DD-MM-YYYY HH:mm:ss')
      });
      await realtimeDatabase.ref('/Chat/' + newMessageRef.key).once('value', (snapshot) => {
        const message = snapshot.val();
        if (message) {
            // console.log('Message data:', message);
            return res.json(message);
        } else {
            console.log('Data not found');
            return res.status(404).json({ message: 'Data not found' });
        }
    });
}
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
exports.RevokeChat = async(req , res) =>{
    try {
        await realtimeDatabase.ref('/Chat/' + req.params.id + '/ThuHoi').set(true);
        return res.json({ msg: "Thu Hồi Thành Công !" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}