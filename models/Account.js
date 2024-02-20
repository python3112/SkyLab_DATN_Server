const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  idTk: String,
  nameTk: String,
  passTk: String,
  quyenTc: [{type : mongoose.Schema.Types.ObjectId , ref :'PhanQuyen'}],
  avavta: String,
  ttTaiKhoan: Boolean,
}, {
  collection:'Account_table'
});

const Account = mongoose.model('Account', accountSchema);

module.exports = {Account};
