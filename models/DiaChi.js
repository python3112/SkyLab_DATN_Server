const mongoose = require('mongoose');
const DiaChiSchema = new mongoose.Schema({
  diaChi: String,
  idTinh: String,
});

const DiaChi = mongoose.model('DiaChi', DiaChiSchema);

module.exports = {DiaChi , DiaChiSchema};
