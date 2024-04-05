const Hangsx = require("../models/Hangsx"); 

exports.home = async (req, res, next) => {
    try {
        const listHang = await Hangsx.find();
        res.render('hang/home_hang', { title: "Quản lý hãng", listHang: listHang });
    } catch (error) {
        res.render("Error/err", { msg: error.message }); 
    }
};

exports.search = async (req, res, next) => {
    const queryValue = req.query.query;
    try {
        if (!queryValue || queryValue.length === 0) { 
            const listHang = await Hangsx.find();
            res.render('hang/home_hang', { title: "Quản lý hãng", listHang: listHang });
        } else {
            const listHang = await Hangsx.find({ tenHangSx: { $regex: queryValue, $options: 'i' } });
            res.render('hang/home_hang', { title: "Quản lý hãng", listHang: listHang });
        }
    } catch (error) {
        res.render("Error/err", { msg: error.message }); // Sử dụng error.message để lấy thông điệp lỗi
    }
};
