
exports.home = (req,res,next)=>{
     user = req.session.Account;
     console.log( 'ss :'+ req.session.Account)
    res.render('home/home',{title: "Trang chủ" , user : user});
}

