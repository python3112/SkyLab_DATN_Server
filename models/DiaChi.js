const mongoose = require('mongoose');
const DiaChiSchema = new mongoose.Schema({
  diaChi: String,
  idTinh: String,
},{
  collection:'DiaChi_Table'
});

const DiaChi = mongoose.model('DiaChi', DiaChiSchema);

module.exports = {DiaChi , DiaChiSchema};
