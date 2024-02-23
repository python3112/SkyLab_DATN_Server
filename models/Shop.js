const mongoose = require('mongoose');
const {diaChiSchema} = require('./DiaChi');
const { sanPhamSchema } = require('./SanPham');

const shopSchema = new mongoose.Schema({
  tenShop: String,
  diaChi: diaChiSchema,
  sdt: String,
  avatar:String,
  trangThai:Boolean,
});

const Shop = mongoose.model('Shop', shopSchema);

module.exports = {Shop,shopSchema};
