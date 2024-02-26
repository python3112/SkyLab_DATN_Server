const KhuyenMai = require('../../models/KhuyenMai');
const { uploadImage, deleteImage } = require('../../middlewares/upload.image.firebase');
const nameFolder = 'KhuyenMai';
// Lấy tất cả các loại sản phẩm có trạng thái là true
exports.getAllKhuyenMai = async (req, res) => {
    try {
        const khuyenMai = await KhuyenMai.find({ trangThai: true });
        res.json(khuyenMai);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAll = async (req, res) => {
    try {
        const khuyenMai = await KhuyenMai.find();
        res.json(khuyenMai);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addKhuyenMai = async (req, res) => {
    try {
        const { thoiGianBatDau,
            thoiGianKetThuc,
            code,
            moTa,
            soLuong,
            soTienGiam,
            trangThai } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: 'Chưa có file upload' });
        }
        
        const imageUrl = await uploadImage(file, nameFolder);

        const newKhuyenMai = new KhuyenMai({
            thoiGianBatDau,
            thoiGianKetThuc,
            code,
            moTa,
            soLuong,
            soTienGiam,
            trangThai,
            anh: imageUrl,
        });

        const savedKhuyenMai = await newKhuyenMai.save();

        return res.status(201).json(savedKhuyenMai);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};