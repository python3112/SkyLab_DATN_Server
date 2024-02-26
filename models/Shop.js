const mongoose = require('mongoose');
const {DiaChiSchema} = require('./DiaChi');
const { sanPhamSchema } = require('./SanPham');

const shopSchema = new mongoose.Schema({
  tenShop: String,
  diaChi: DiaChiSchema,
  sdt: String,
  avatar:String,
  trangThai:Boolean,
},
{
  collection:'Shop_Table'
});

const Shop = mongoose.model('Shop', shopSchema);

module.exports = {Shop,shopSchema};
