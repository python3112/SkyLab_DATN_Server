const hang = require("../models/Hangsx");
const { uploadImage, deleteImage } = require('../middlewares/upload.image.firebase');
const nameFolder = 'HangSx';
exports.home = async (req, res, next) => {
    try {
        const user = req.session.Account;
        const listHang = await hang.find();
        res.render('hang/home_hang', { title: "Quản lý hãng", listHang: listHang    , user :  user});
    }
    catch (error) {
        res.render("Error/err", { msg: error });
    }

}
exports.search = async (req, res, next) => {
    const queryValue = req.query.query;
    try {
        if (queryValue.lenght === 0) {
            const listHang = await hang.find();
            res.render('hang/home_hang', { title: "Quản lý hãng", listHang: listHang });
        }
        else {
            const listHang = await hang.find({ tenHangSx: { $regex: queryValue, $options: 'i' } });
            res.render('hang/home_hang', { title: "Quản lý hãng", listHang: listHang });
        }
    }
    catch (error) {
        res.render("Error/err", { msg: error });
    }
}
exports.update = async (req, res, next) => {
    let id = req.params.id;
    const hangOld = await hang.findById(id)
    const file = req.file;
    if (file) {
        await deleteImage(hangOld.imageLogo);
        hangOld.imageLogo = await uploadImage(file, nameFolder)
    }
    let trangThai = req.body.trangThai === 'True' ? true : false;
    console.log(trangThai)
    hangOld.trangThai = trangThai;
    hangOld.tenHangSx = req.body.tenHangSx;
    console.log(hangOld)
    try {
        await hangOld.save();
        res.redirect('/hang')
    }
    catch (error) {
        res.render("Error/err", { msg: error });
    }
}  
