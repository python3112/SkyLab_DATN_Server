const mongoose = require('mongoose');
const KhuyenMaiSchema = new mongoose.Schema({
    thoiGianBatDau:Date,
    thoiGianKetThuc:Date,
    code:String,
    moTa:String,
    soLuong:Number,
    soTienGiam:Number,
    trangThai:Boolean,
    anh:String,
},{
    collection:'KhuyenMai_table'
})
const KhuyenMai = mongoose.model('KhuyenMai' , KhuyenMaiSchema)
module.exports = KhuyenMai;



