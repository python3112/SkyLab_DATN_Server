const Pttt = require('../../models/PhuongThucThanhToan');

// Lấy tất cả các loại sản phẩm có trạng thái là true
exports.getAllPTTT = async (req, res) => {
    try {
        const pttt = await Pttt.find({ trangThai: true });
        res.json(pttt);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};