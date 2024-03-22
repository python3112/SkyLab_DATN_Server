const mongoose = require('mongoose');
const ThongBaoSchema = new mongoose.Schema({
  idDonHang: String,
  idSanPham: String,
  idAccount: String,
  tieuDe: String,
  noiDung: String,
  daXem: Boolean,
  thoiGian: { type: Date, default: Date.now }
},{
  collection:'ThongBao_Table'
});

const ThongBao = mongoose.model('ThongBao', ThongBaoSchema);

module.exports = {ThongBao , ThongBaoSchema};
