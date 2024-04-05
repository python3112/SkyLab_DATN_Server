const userModel = require('../models/Account');
exports.home = async (req,res,next)=>{
    try{
        let listUser = await userModel.find();
        res.render('user/home_user',{title:"Quản lý người dùng", listUser: listUser})
    }
    catch(error){
        res.render('Error/err',{msg: error})
    }
}
exports.findUserTrue = async (req, res, next) =>{
    try{
        let listUser = [];
        listUser = await userModel.find({trangThai: true})
        res.render('user/home_user',{title:"Người dùng còn hoạt động", listUser: listUser})
    }
    catch(error){
        res.render('Error/err',{msg: error}) 
    }
}
exports.findUserFales =  async (req, res, next) =>{
    try{
        let listUser = [];
        listUser = await userModel.find({trangThai: false})
        res.render('user/home_user',{title:"Người dùng đã dừng hoạt động", listUser: listUser})
    }
    catch(error){
        res.render('Error/err',{msg: error}) 
    }
}
exports.query = async (req, res , next )=>{
    try{
        let queryValue = req.query.query;
        if(queryValue.lenght === 0){
            let listUser = [];
            listUser = await userModel.find()
            res.render('user/home_user',{title:"Quản lý ngươi dùng", listUser: listUser})
        }
        let listUser = [];
        listUser = await userModel.find({ taiKhoan: { $regex: queryValue, $options: 'i' } });
        res.render('user/home_user',{title: "Người dùng: '"+queryValue+"'", listUser: listUser});
    }
    catch(error){
        res.render('Error/err',{msg: error}) 
    }
    
}