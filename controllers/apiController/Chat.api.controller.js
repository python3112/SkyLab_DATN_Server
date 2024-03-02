
const {realtimeDatabase , admin} = require('../../middlewares/firebase.config');
const moment = require('moment');

exports.GetChats = async(req , res) =>{
try {
    
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