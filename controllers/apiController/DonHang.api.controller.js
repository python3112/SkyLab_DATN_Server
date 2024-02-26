const DonHang = require('../../models/DonDatHang');
const GioHang = require('../../models/GioHang');



exports.GetAllDonHang = async(req , res , next) =>{
  
        try {
            const listdonhang = await DonHang.find();
            res.json(listdonhang);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
   
}
exports.getDonhangByidShop = async(req , res, next) =>{
    try {
        const listdonhang = await DonHang.find({idShop :  req.parmas.id});
        res.json(listdonhang);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
exports.getDonhangByidShipper = async(req , res, next) =>{
    try {
        const listdonhang = await DonHang.find({idShipper :  req.parmas.id});
        res.json(listdonhang);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
exports.getDonhangByidNguoiMua = async(req , res, next) =>{
    try {
        const idgioHang = await GioHang.findOne({idNguoiMua : req.parmas.id  , thanhtoan :  true});
        if(!idgioHang){
            return res.json(null)   
        }else{
            const listdonhang = await DonHang.find({idGioHang : idgioHang._id});
            return res.json(listdonhang);
        }
       
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
exports.CreateDonHang = async(req , res , next)=>{
    
}