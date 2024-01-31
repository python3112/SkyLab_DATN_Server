const mongoose = require("mongoose");


mongoose.connect(process.env.URL_SERVER).then(()=>{
    console.log('kết nối thành công !')
})
.catch((error)=>{
    console.log( `lỗi  :   ${error}`)
});
module.exports = {mongoose};