var Account = require('../../models/Account');
var {Shop} = require('../../models/Shop');
var Message = require('../../models/Mess');
const { uploadImages, deleteImage } = require('../../middlewares/upload.image.firebase');
const nameFolder = 'Message';

exports.CreateMess = async(req , res) => {
    try {
        const {idNguoiGui , idNguoinhan , content} = req.body
        const files = req.files;
        console.log(req.files);
        const NewMess = new Message({
            content :  content,
            Nguoigui : idNguoiGui,
            NguoiNhan: idNguoinhan,
            Thuhoi:false,
        })
        if(!files){
            await NewMess.save();
            return res.json(NewMess);
        }
        const images = await uploadImages(files, nameFolder);
        NewMess.AnhTinNhan = images;
        await NewMess.save();
        return res.json(NewMess);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
 
   
}
exports.getConversations = async(req , res) =>{
        
}