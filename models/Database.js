const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/DATN_Server', {
     
    });
    console.log('Kết nối thành công đến MongoDB');
  } catch (error) {
    console.error('Lỗi kết nối đến MongoDB:', error);
  }
};

module.exports = connectDB;
