const mongoose = require('mongoose');
// private String _id;
//     private Date thoiGianBatDau;
//     private Date thoiGianKetThuc;
//     private String moTa;
//     private int soLuong;
//     private boolean trangThai;
const KhuyenMaiSchema = new mongoose.Schema({
    thoiGianBatDau:Date,
    thoiGianKetThuc:Date,
    CodeKhuyenMai:String,
    soLuong:Number,
    trangThai_Km:Boolean,
},{
    collection:'KhuyenMai_table'
})
const KhuyenMai = mongoose.model('khuyenmai' , KhuyenMaiSchema)
module.exports = KhuyenMai;



