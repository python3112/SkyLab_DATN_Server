
exports.home = (req,res,next)=>{
    const user = req.session.Account;
    res.render('thongbao/home_thongbao',{title: "Quản lý thông báo" , user :  user});
}