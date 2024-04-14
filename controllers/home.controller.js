
exports.home = (req,res,next)=>{
     userLogin = req.session.userLogin;
    res.render('home/home',{title: "Trang chủ" , userLogin :  userLogin});
}

exports.Logout = (req , res  , next) => {
    req.session.destroy((err) => {
        if(err){
          console.log(err)
        }else{
          return res.redirect('/');
        }
      })
}