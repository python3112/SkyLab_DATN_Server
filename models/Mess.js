const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({

  idChat: {
    type: String
   
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

});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;

