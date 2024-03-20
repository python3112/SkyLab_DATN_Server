
exports.home = (req,res,next)=>{
    res.render('user/home_user',{title: "Quản lý người dùng"});
}