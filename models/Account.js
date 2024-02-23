const mongoose = require('mongoose');
const {diaChiSchema} = require('./DiaChi'); // Import DiaChi model
const {shopSchema} = require('./Shop'); // Import Shop model

const accountSchema = new mongoose.Schema({
  taiKhoan: String,
  hoTen: String,
  matKhau: String,
  email: String,
  sdt: String,
  tenQuyen: {
    type: String,
    enum: ['User', 'Admin', 'Shipper'],
    default: 'User',
  },
  avatar: String,
  trangThai: Boolean,
  diaChi: [diaChiSchema], 
  shop: shopSchema, 
}, {
  collection: 'Account_table',
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
