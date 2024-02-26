const mongoose = require('mongoose');
const DiaChiSchema = new mongoose.Schema({

  tenDiaChi: String,
  diaChi: String,
  trangThai: Boolean,

},{
  collection:'DiaChi_Table'
});

const DiaChi = mongoose.model('DiaChi', DiaChiSchema);

module.exports = {DiaChi , DiaChiSchema};
