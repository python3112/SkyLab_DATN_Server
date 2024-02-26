const mongoose = require('mongoose');

const GioHangSchema = new mongoose.Schema({
    idSanpham: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SanPham' }],
    idNguoiMua:{ 
        type: mongoose.Schema.Types.ObjectId,
         ref: 'Account'},
}, {
    collection:'GioHang_Table'
})

const GioHang = mongoose.model('GioHang', GioHangSchema);
module.exports = GioHang;
