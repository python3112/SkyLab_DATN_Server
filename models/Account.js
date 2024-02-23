const mongoose = require('mongoose');

const diaChiSchema = new mongoose.Schema({
  tenDiaChi: String,
  diaChi: String,
  trangThai: Boolean,
});

const accountSchema = new mongoose.Schema({
  taiKhoan: String,
  hoTen: String,
  matKhau: String,
  email: String,
  sdt: String,
  tenQuyen: {
    type: String,
    enum: ['User', 'Admin', 'Shipper'],
    default: 'User'
  },
  avatar: String,
  trangThai: Boolean,
  diaChi: [diaChiSchema], // Mảng địa chỉ
}, {
  collection: 'Account_table'
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
