var Account = require('../models/Account')

exports.login = async(req, res, next)=>{
    let msg = '';
    if (req.method == 'POST') {
        try {
            var objU = await Account.findOne({ taiKhoan: req.body.taiKhoan });

           
            if (objU != null) {
                // tồn tại username ==> kiểm tra passwd
                if (objU.matKhau == req.body.matKhau) {
                    // đúng thông tin tài khoản ==> lưu vào session
                    if (objU.tenQuyen.toString() === 'Admin' && objU.trangThai ==  true) {
                        req.session.Account = objU
                        console.log( 'seesion : ' + req.session.Account)
                        return res.render("home/home" , {title: "Trang chủ"});
                        // chuyển trang về trang quản trị
                    } else {
                        msg = 'không phải admin'
                    }

                } else {
                    msg = 'Sai password';
                }


            } else {
                msg = 'Không tồn tại tài khoản: ' + req.body.taiKhoan;

            }
            


        } catch (error) {
            msg = error.message;
        }
    }


    res.render('login/login', { msg: msg })

}