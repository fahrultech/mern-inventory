const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubkategoriSchema = new Schema({
    namaSubkategori :{
        type : String,
        required : true
    },
    categoryId :{
        type : Schema.Types.ObjectId,
        required : true
    }
})

module.exports = Subkategori = mongoose.model('subkategori', SubkategoriSchema);