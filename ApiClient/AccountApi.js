var md  = require('../models/Account')
exports.getAll = async(req , res , next) =>{
    try {
       const data  = await md.Account.find();
        
    } catch (error) {
        
    }
    res.json({data})
}