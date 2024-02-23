const mongoose = require('mongoose');
const {diaChiSchema} = require('./DiaChi'); // Import DiaChi model
const {shopSchema} = require('./Shop'); // Import Shop model

const accountSchema = new mongoose.Schema({
  taiKhoan: String,
  hoTen: String,
  matKhau: String,
<<<<<<< HEAD
  Email:String,
  Sdt:Number,
  quyenTk: {type : mongoose.Schema.Types.ObjectId , ref :'PhanQuyen'},
=======
  email: String,
  sdt: String,
  tenQuyen: {
    type: String,
    enum: ['User', 'Admin', 'Shipper'],
    default: 'User',
  },
>>>>>>> f5a6fe0395111087804b87cc850084380f45ce7f
  avatar: String,
  idDiachi:{type : mongoose.Schema.Types.ObjectId , ref:'Diachi'},
  trangThai: Boolean,
  diaChi: [diaChiSchema], 
  shop: shopSchema, 
}, {
  collection: 'Account_table',
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
