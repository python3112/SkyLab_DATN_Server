const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  idTk: String,
  nameTk: String,
  passTk: String,
  quyenTc: String,
  avavta: String,
  ttTaiKhoan: Boolean,
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
