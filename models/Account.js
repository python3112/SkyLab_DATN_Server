const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  nameTk: String,
  passTk: String,
  quyenTc: [{type : mongoose.Schema.Types.ObjectId , ref :'PhanQuyen'}],
  avata: String,
  ttTaiKhoan: Boolean,
}, {
  collection:'Account_table'
});

const Account = mongoose.model('Account', accountSchema);

module.exports = {Account};
