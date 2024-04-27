const mongoose = require('mongoose');
const {DiaChiSchema} = require('./DiaChi'); // Import DiaChi model

const accountSchema = new mongoose.Schema({
  taiKhoan: String,
  hoTen: String,
  matKhau: String,
  email: String,
  sdt: String,
  tenQuyen: {
    type: String,
    enum: ['User', 'Admin'],
    default: 'User',
  },
  avatar: String,
  trangThai: Boolean,
  diaChi: DiaChiSchema, 
  thoiGian: {
    type: Date,
    default: Date.now,
  },
}, {
  collection: 'Account_table',
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
