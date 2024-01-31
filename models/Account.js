const db = require('./db');

const accountSchema = new db.mongoose.Schema({
  idTk: String,
  nameTk: String,
  passTk: String,
  quyenTc: [{type : db.mongoose.Schema.Types.ObjectId , ref :'PhanQuyen'}],
  avavta: String,
  ttTaiKhoan: Boolean,
}, {
  collection:'Account_table'
});

const Account = db.mongoose.model('Account', accountSchema);

module.exports = {Account};
