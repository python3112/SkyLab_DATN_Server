const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  taiKhoan: String,
  matKhau: String,
  quyenTk: [{type : mongoose.Schema.Types.ObjectId , ref :'PhanQuyen'}],
  avatar: String,
  trangThai: Boolean,
}, {
  collection:'Account_table'
});

const Account = mongoose.model('Account', accountSchema);

module.exports = {Account};
