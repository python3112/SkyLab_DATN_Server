const {ThongBao} = require('../../models/ThongBao');

exports.getThongBaoByIdAccount = async (req, res, next) => {
    try {
        const thongBao = await ThongBao.find({ idAccount: req.params.id });
        if (thongBao) {
            return res.json(thongBao);
        } else {
            return res.status(400).json({ message: "Không có" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.editDaXem = async (req, res, next) => {
    try {
        const thongBaoList = await ThongBao.find({ idAccount: req.params.id });

        thongBaoList.forEach(async (thongBao) => {
            thongBao.daXem = true;
            await thongBao.save(); 
        });
        res.json({ success: true});
    } catch (error) {
        res.status(500).json({success: false, message: error.message });
    }
};

exports.xoaTheoIdAccount = async (req, res, next) => {
    try {
        const result = await ThongBao.deleteMany({ idAccount: req.params.id });
        if (result.deletedCount > 0) {
            return res.json({ success: true, message: "Đã xóa tất cả thông báo" });
        } else {
            return res.status(400).json({ success: false, message: "Không có thông báo nào để xóa" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.xoaTheoIdThongBao = async (req, res, next) => {
    try {
        const result = await ThongBao.deleteOne({ _id: req.params.id });
        if (result.deletedCount > 0) {
            return res.json({ success: true, message: "Đã xóa thông báo" });
        } else {
            return res.status(400).json({ success: false, message: "Không có thông báo nào để xóa" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
