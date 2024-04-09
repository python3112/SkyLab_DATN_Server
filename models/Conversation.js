const mongoose = require('mongoose');
const ChatSchema = new mongoose.Schema({
    Nguoigui: {
        type: String,
      },
      NguoiNhan: {
        type: String,
      },
    

}, {
    collection: 'Chat_table',
    timestamps : true,
});

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;