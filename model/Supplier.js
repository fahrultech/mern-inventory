const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SupplierSchema = new Schema({
    nama : {
        type : String,
        required : true
    },
    alamat : {
        type : String,
    },
    notelepon :{
        type : String
    },

},{ timestamps:true })

module.exports = Supplier = mongoose.model('supplier', SupplierSchema);