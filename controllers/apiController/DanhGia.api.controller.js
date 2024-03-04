const DonHang = require('../../models/DonDatHang');
const { uploadImages } = require('../../middlewares/upload.image.firebase');
const nameFolder = 'DanhGia';

exports.getDaDanhGia = async (req, res, next) => {
    try {
        const donHangList = await DonHang.find({
            'trangThai.trangThai': 'Đã đánh giá'
        });

        if (donHangList && donHangList.length > 0) {
            return res.json(donHangList);
        } else {
            return res.status(400).json({ message: "Không có đơn hàng nào đã đánh giá" });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getChuaDanhGia = async (req, res, next) => {
    try {
        const donHangList = await DonHang.find({
            'trangThai.trangThai': 'Chưa đánh giá'
        });

        if (donHangList && donHangList.length > 0) {
            return res.json(donHangList);
        } else {
            return res.status(400).json({ message: "Không có đơn hàng nào đã đánh giá" });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
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
