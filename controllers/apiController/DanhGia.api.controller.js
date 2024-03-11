const DonHang = require('../../models/DonDatHang');
const { uploadImages } = require('../../middlewares/upload.image.firebase');
const nameFolder = 'DanhGia';

exports.getDaDanhGia = async (req, res, next) => {
    try {
        const idAccount = req.params.id;
        const donHangDaDanhGia = await DonHang.find({
            'idAccount': idAccount,
            'danhGia': { '$exists': true, '$ne': null }
        });

        res.json(donHangDaDanhGia);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getChuaDanhGia = async (req, res, next) => {
    try {
        const idAccount = req.params.id;
        const donHangChuaDanhGia = await DonHang.find({
            'idAccount': idAccount,
            'danhGia': { '$exists': false },
            'trangThai.isNow': true,
            'trangThai.trangThai': 'Đã giao hàng'
        });

        res.json(donHangChuaDanhGia);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.themDanhGia = async (req, res) => {
    try {
        const donHangID = req.params.id;
        const { soSao, noiDung } = req.body;

        const donHang = await DonHang.findById(donHangID);

        if (!donHang) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
        }
        let imageUrlAnh =[];
        let files = req.files;
        if (files) {
            imageUrlAnh = await uploadImages(files, nameFolder);
        }
        const newDanhGia = { soSao, noiDung, anh: imageUrlAnh };
        donHang.danhGia = newDanhGia;

        await donHang.save();
        res.json({ success: true, message: 'Thêm đánh giá thành công' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
