const userModel = require('../models/Account');
exports.home = async (req,res,next)=>{
    try{
        const user = req.session.Account;
        let listUser = await userModel.find();
        res.render('user/home_user',{title:"Quản lý người dùng", listUser: listUser , user :  user})
    }
    catch(error){
        res.render('Error/err',{msg: error})
    }
}
exports.findUserTrue = async (req, res, next) =>{
    try{
        const user = req.session.Account;
        let listUser = [];
        listUser = await userModel.find({trangThai: true})
        res.render('user/home_user',{title:"Người dùng còn hoạt động", listUser: listUser, user :  user })
    }
    catch(error){
        res.render('Error/err',{msg: error}) 
    }
}
exports.findUserFales =  async (req, res, next) =>{
    try{
        const user = req.session.Account;
        let listUser = [];
        listUser = await userModel.find({trangThai: false})
        res.render('user/home_user',{title:"Người dùng đã dừng hoạt động", listUser: listUser, user: user})
    }
    catch(error){
        res.render('Error/err',{msg: error}) 
    }
}
exports.query = async (req, res , next )=>{
    try{
        const user = req.session.Account;
        let queryValue = req.query.query;
        if(queryValue.lenght === 0){
            let listUser = [];
            listUser = await userModel.find()
            res.render('user/home_user',{title:"Quản lý ngươi dùng", listUser: listUser,user: user})
        }
        let listUser = [];
        listUser = await userModel.find({ taiKhoan: { $regex: queryValue, $options: 'i' } });
        res.render('user/home_user',{title: "Người dùng: '"+queryValue+"'", listUser: listUser, user: user});
    }
    catch(error){
        res.render('Error/err',{msg: error}) 
    }
    
}
exports.update = async (req, res, next)=>{
    try{
        let id = req.params.id;
        let trangThai = req.body.trangThai === 'True' ? true : false;
        let user = await userModel.findById(id);
        user.trangThai = trangThai;
        await user.save();
        res.redirect('/user')
    }
    catch(error){
        res.render('Error/err',{msg: error}) 
    }
}