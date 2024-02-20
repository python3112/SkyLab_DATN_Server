const mongoose = require('mongoose');

const theloaiSpSchema = new mongoose.Schema({
  
  idSanpham: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SanPham' }],
  tenTheLoai: String,
  trangThai: Boolean,
});

const TheloaiSp = mongoose.model('TheloaiSp', theloaiSpSchema);

module.exports = TheloaiSp;
