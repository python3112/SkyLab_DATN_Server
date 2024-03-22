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