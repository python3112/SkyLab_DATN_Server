const mongoose = require('mongoose');
const GioHangSchema = new mongoose.Schema({
    idSanPham: { type: mongoose.Schema.Types.ObjectId, ref: 'SanPham' },
    idAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
    soLuong: Number,
  idBienThe: String,
}, {
    collection: 'GioHang_Table'
});

const GioHang = mongoose.model('GioHang', GioHangSchema);
module.exports = GioHang;
