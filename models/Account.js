const mongoose = require('mongoose');
const {DiaChiSchema} = require('./DiaChi'); // Import DiaChi model
const {shopSchema} = require('./Shop'); // Import Shop model

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
  idDiachi:{type : mongoose.Schema.Types.ObjectId , ref:'Diachi'},
  trangThai: Boolean,
  diaChi: [DiaChiSchema], 
  shop: shopSchema, 
}, {
  collection: 'Account_table',
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
