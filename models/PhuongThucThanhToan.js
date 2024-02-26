const mongoose = require('mongoose');

const ptttSchema = new mongoose.Schema({
  tenPhuongThuc: String,
  trangThai:Boolean
}, {
  collection: 'PhuongThucThanhToan_table'
});

const PhuongThucThanhToan = mongoose.model('PhuongThucThanhToan', ptttSchema);

module.exports = PhuongThucThanhToan;

