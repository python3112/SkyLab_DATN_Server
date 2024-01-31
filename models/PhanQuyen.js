const mongoose = require('mongoose');



const PhanQuyenSchema = new mongoose.Schema({
  idQuyen : String ,
  QuyenTruyCap : String, 
});

const PhanQuyen = mongoose.model('PhanQuyen', sanPhamSchema);

module.exports = SanPham;