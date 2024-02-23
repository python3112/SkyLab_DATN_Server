const mongoose = require('mongoose');

const diaChiSchema = new mongoose.Schema({
  tenDiaChi: String,
  diaChi: String,
  trangThai: Boolean,
},{
  collection:'DiaChi_Table'
});

const DiaChi = mongoose.model('DiaChi', diaChiSchema);

module.exports = {DiaChi,diaChiSchema};
