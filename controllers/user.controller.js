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
exports.nguoiDungMoi =  async (req,res,next)=>{
    try{
    let today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth();
        let day = today.getDate();
        let startOfDay = new Date(year, month, day, 0, 0, 0, 0);
        let endOfDay = new Date(year, month, day, 23, 59, 59, 999);
    const resultDoanhUserNew = await userModel.aggregate([
        {
            $match: {
                thoiGian: {
                    $gte: startOfDay,
                    $lt: endOfDay
                }
            }
        },
        {
            $group: {
                _id: null,
                soLuong: { $sum: 1 }
            }
        }
    ]);
    if (resultDoanhUserNew && resultDoanhUserNew.length > 0) {
        // Lấy danh sách người dùng dựa trên kết quả của truy vấn aggregation
        const userList = await userModel.find({
            thoiGian: {
                $gte: startOfDay,
                $lt: endOfDay
            }
        });
        res.render('user/home_user',
        {
        title:"Người dùng mới",
         listUser: userList,
          user :  user })
    } else {
        res.render('user/home_user',
        {
        title:"Người dùng mới",
         listUser: [],
          user :  user })
    }
}
catch(error){
    console.log('Không tìm thấy kết quả phù hợp.');
}
}