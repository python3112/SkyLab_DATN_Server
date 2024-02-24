const PhanQuyen = require('../../models/PhanQuyen');
const PhanQuyenModel = require('../../models/PhanQuyen');

exports.getPhanQuyen = async(req ,res , next) => {
    try {
           const ListPhanQuyen = await PhanQuyenModel.find(); 
           if(ListPhanQuyen.length >  0 ){
            return res.json({status :  200 , msg : 'lấy dữ liệu thành công !' , data :  ListPhanQuyen })
           }else{
            return res.json({status :  200 , msg : 'k có dự liệu  !' , data :  ListPhanQuyen })
           }
    } catch (error) {
        return res.json({status : 500 , msg : error.message  , data : []})
    }
}

exports.ThemPhanQuyen = async(req ,res , next) => {
    try {
        const newQuyen = new PhanQuyen({
            QuyenTruyCap : req.body.QuyenTruyCap
          });

          await newQuyen.save();  


res.json({ status: 200, msg: "Thêm Quyền thành công" });
           
    } catch (error) {
        return res.json({status : 500 , msg : error.message})
    }
}
