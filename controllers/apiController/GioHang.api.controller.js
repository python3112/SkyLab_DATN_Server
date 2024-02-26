const { json } = require('express');
const GioHang = require('../../models/GioHang');

exports.getGioHangbyId = async (req, res, next) => {
    try {
        const giohang = await GioHang.findOne({ idNguoiMua: req.params.id });

        if (giohang) {
            return res.json(giohang);
        } else {
            return res.status(400).json({ message: "" });
        }


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createGioHang = async (req, res, next) => {
    try {
        const { idSanpham, idNguoiMua } = req.body;
        const checkGioHang = await GioHang.findOne({ idNguoiMua: idNguoiMua });
        if (checkGioHang) {
            return;
        }

        const newGioHang = new GioHang({
            idNguoiMua,
            idSanpham: [],
        })
        const luuGiohang = await newGioHang.save();

        return res.json(luuGiohang)

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.GetSpGioHang = async (req, res, next) => {
    try {
        const idGiohang = req.params.idGiohang;
        const giohang = await GioHang.findById(idGiohang);
        const listSp = giohang.idSanpham;
        return res.json(listSp);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}
exports.updateListSp = async (req, res, next) => {
    try {
        const { listsp } = req.body;
        const giohang = await GioHang.findById(req.params.id);

        if (!giohang) {
            res.status(400).json({ message: 'vô lý !' });
        }

        giohang.idSanpham = listsp;

        await giohang.save();


    } catch (error) {
        res.status(500).json({ message: error.message });
    }


}

