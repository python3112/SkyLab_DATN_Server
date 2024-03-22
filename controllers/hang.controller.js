const hang = require("../models/Hangsx");
exports.home = async (req,res,next)=>{
    try{
        const listHang = await hang.find();
        res.render('hang/home_hang',{title: "Quản lý hãng", listHang: listHang});
    }
    catch(error){
        res.render('hang/home_hang',{title: "Quản lý hãngErrr", listHang: listHang});
    }
    
}
exports.search = async (req,res,next)=>{
    const queryValue = req.query.query;
    try{
    if (queryValue.lenght == 0) {
        const listHang = await hang.find();
        res.render('hang/home_hang',{title: "Quản lý hãng", listHang: listHang});
    }
    else{
        const listHang = await hang.find({ tenHangSx: { $regex: queryValue, $options: 'i' } });
        res.render('hang/home_hang',{title: "Quản lý hãng", listHang: listHang});
    }  
    }
    catch(error){
        render.send("Oô có lỗi gì đó sai sai")
    }
   
}
exports.gotoAddView = (req, res, next) =>{
    res.render('hang/them_hang',{title: "Thêm Hãng Sản Xuất"})
}