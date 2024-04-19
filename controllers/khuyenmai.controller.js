const khuyenmaiMd = require('../models/KhuyenMai')
const nameFolder = 'KhuyenMai';
const KhuyenMai = require('../models/KhuyenMai')
const { uploadImage, deleteImage } = require('../middlewares/upload.image.firebase');
exports.home = async (req,res,next)=>{
    try{
        const user = req.session.Account;
        let listKhuyenMai = await khuyenmaiMd.find();
        res.render('khuyenmai/home_khuyenmai',{title: "Quản lý khuyến mãi", listKhuyenMai: listKhuyenMai , user : user});
    }
    catch(error){
        res.render("Error/err",{msg: error.message})
    }
    
}
exports.search = async (req,res,next)=>{
    const listKhuyenMai= [];
    const queryValue = req.query.query;
    try{
    if (queryValue.lenght === 0) {
        res.render('khuyenmai/home_khuyenmai',{title: "Quản lý Khuyến mại: id = null", listKhuyenMai: listKhuyenMai});
    }
    else{
        const khuyenmai = await khuyenmaiMd.findById(queryValue);
        listKhuyenMai.push(khuyenmai)
        res.render('khuyenmai/home_khuyenmai',{title: "Quản lý Khuyến mại id: "+queryValue, listKhuyenMai: listKhuyenMai});
    }  
    }
    catch(error){
        res.render("Error/err",{msg: error.message});
    }
   
}
exports.addKhuyenMai = async (req, res) => {
    try {
        const { thoiGianBatDau,
            thoiGianKetThuc,
            code,
            moTa,
            soLuong,
            soTienGiam
            } = req.body;
        const file = req.file;
        const trangThai = req.body.trangThai === 'True' ? true : false;
        let checkStatus = req.body.trangThai
         if (!file) {
            res.render("Error/err",{msg: "Chưa có file upload"});
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
        let listKhuyenMai = await khuyenmaiMd.find();
        return  res.redirect('/khuyen-mai');
    } catch (error) {
        console.error(error);
        res.render("Error/err",{msg: error.message});
    }
};
exports.update = async (req, res, next)=>{
    try{
        const id = req.params.id;
        const { thoiGianBatDau,
            thoiGianKetThuc,
            code,
            moTa,
            soLuong,
            soTienGiam
            } = req.body;
        const file = req.file;
        const trangThai = req.body.trangThai === 'True' ? true : false;
        const KhuyenMaiOld = await khuyenmaiMd.findById(id);
        if(file){
            await deleteImage(KhuyenMaiOld.anh);
            KhuyenMaiOld.anh = await uploadImage(file, nameFolder)
        }
        KhuyenMaiOld.thoiGianBatDau = thoiGianBatDau;
        KhuyenMaiOld.thoiGianKetThuc = thoiGianKetThuc;
        KhuyenMaiOld.code = code;
        KhuyenMaiOld.moTa = moTa;
        KhuyenMaiOld.soLuong = soLuong;
        KhuyenMaiOld.soTienGiam = soTienGiam;
        KhuyenMaiOld.trangThai = trangThai;
        await KhuyenMaiOld.save();
        return  res.redirect('/khuyen-mai');
    }
    catch(error){
        res.render("Error/err",{msg: error.message});
    }
    
}