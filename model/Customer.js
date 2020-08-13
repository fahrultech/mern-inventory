const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    nama : {
        type: String,
        required: true
    },
    alamat : {
        type: String,
    },
    telp : {
        type: String
    }
},{timestamps:true})

module.exports = Customer = mongoose.model('customer', CustomerSchema);