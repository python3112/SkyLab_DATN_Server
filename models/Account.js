const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  taiKhoan: String,
  matKhau: String,
  Email:String,
  Sdt:Number,
  quyenTk: {type : mongoose.Schema.Types.ObjectId , ref :'PhanQuyen'},
  avatar: String,
  idDiachi:{type : mongoose.Schema.Types.ObjectId , ref:'Diachi'},
  trangThai: Boolean,
},{
  collection:'Account_table'
});

const Account = mongoose.model('Account', accountSchema);

module.exports = {Account};
