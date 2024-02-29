const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    content: {
      type: String,
    },
    Nguoigui: {
      type: String,
    },
    NguoiNhan:{
        type: String,
    },
    AnhTinNhan:[String],
    ThuHoi:Boolean,
    thoiGian: {
      type: Date,
      default: Date.now,
    },
    
  } , {
    collection :'Message_table' ,
  });
  
  const Message = mongoose.model('Message', messageSchema);
  
  module.exports = Message;