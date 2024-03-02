var Account = require('../../models/Account');
var Message = require('../../models/Mess');
const { uploadImages, deleteImage } = require('../../middlewares/upload.image.firebase');

const {newMessageRef} = require('../../middlewares/Mess.firebase');


const nameFolder = 'Message';

exports.CreateMess = async(req , res) => {
    try {

        const {idNguoiGui , content , idChat} = req.body
        console.log(req.files);
        const NewMess = new Message({
            idChat : idChat,
            content : content,
            idAccount : idNguoiGui,
            Thuhoi:false,
        })
        console.log(NewMess);
        await NewMess.save();
        
        return res.json(NewMess);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
 
   
}
exports.CreateMessWithFile = async(req , res) => {
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

exports.getChats = async(req , res) =>{
    try {
        const {idChat } = req.body
        const listChats = await Message.find({idChat : idChat })
        return res.json(listChats);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}
exports.deleteMess = async(req , res , next) =>{
    try {
        const message = await Message.findById(req.params.id);
        if(message.AnhTinNhan.length > 0){
            for (let index = 0; index < message.AnhTinNhan.length; index++) {
                const element = message.AnhTinNhan[index];
                console.log(element);
                await deleteImage(element);
            }
           const check = await Message.deleteOne({_id :  req.params.id});
           if(check){
            return res.status(200).json({mess :  'xóa thành công !'})
           }
        }
        const check = await Message.deleteOne({_id :  req.params.id});
        if(check){
            return res.status(200).json({mess :  'xóa thành công !'})
        }
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }


}
