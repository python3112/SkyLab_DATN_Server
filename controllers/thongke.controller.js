
exports.home = (req,res,next)=>{
    const user = req.session.Account;
    res.render('thongke/home_thongke',{title: "Thống kê" , user :  user});
}