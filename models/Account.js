const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  taiKhoan: String,
  hoTen:String,
  matKhau: String,
  email:String,
  sdt:String,
  tenQuyen: {
    type: String,
    enum: ['User', 'Admin', 'Shipper'],
    default: 'User' 
  },
  avatar: String,
  trangThai: Boolean,
},{
  collection:'Account_table'
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
