const khuyenmaiMd = require('../models/KhuyenMai')
exports.home = async (req,res,next)=>{
    try{
        let listKhuyenMai = await khuyenmaiMd.find();
        res.render('khuyenmai/home_khuyenmai',{title: "Quản lý khuyến mãi", listKhuyenMai: listKhuyenMai});
    }
    catch(error){
        res.send("Co gi do sai sai !")
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
        // res.send(null)
        res.render('khuyenmai/home_khuyenmai',{title: "Quản lý Khuyến mại id: "+queryValue, listKhuyenMai: listKhuyenMai});
    }  
    }
    catch(error){
        res.render('khuyenmai/home_khuyenmai',{title: "Quản lý Khuyến mại id: "+queryValue, listKhuyenMai: listKhuyenMai});
    }
   
}