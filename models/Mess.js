const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({



  idChat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat'
  },
  idAccount:{
    type : String
  },
  content: {
    type: String,
  },
  AnhTinNhan: [String],
  ThuHoi: Boolean,
  thoiGian: {
    type: Date,
    default: Date.now,
  },

}, {
  collection: 'Message_table',
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;

