const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Định nghĩa schema cho level3
const Level3Schema = new Schema({
    level3_id: String,
    name: String,
    type: String
});

// Định nghĩa schema cho level2
const Level2Schema = new Schema({
    level2_id: String,
    name: String,
    type: String,
    level3s: [Level3Schema] // Mảng các level3
});

// Định nghĩa schema cho level1
const Level1Schema = new Schema({
    level1_id: String,
    name: String,
    type: String,
    level2s: [Level2Schema] // Mảng các level2
});

// Tạo model dựa trên schema
const Level1Model = mongoose.model('Level1', Level1Schema);

module.exports = Level1Model;
