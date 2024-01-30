const mongoose = require("mongoose");

mongoose.connect(process.env.URL_MONGODB).catch((error)=>{
    console.log(error)
});
module.exports =  {mongoose};