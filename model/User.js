const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    nama : {
        type: String,
        required: true
    },
    jeniskelamin:{
        type: String,
        required: true
    },
    tempatlahir: {
        type: String,
        required: true
    },
    tanggallahir: {
        type: Date,
        required: true
    },
    alamat: {
        type: String
    }

},{timestamps:true})

module.exports = User = mongoose.model('user', UserSchema);