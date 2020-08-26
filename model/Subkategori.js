const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubkategoriSchema = new Schema({
    namaSubkategori :{
        type : String,
        required : true
    },
    kategori :{
        type : Schema.Types.ObjectId,
        ref : 'kategori',
        required : true
    }
})

module.exports = Subkategori = mongoose.model('subkategori', SubkategoriSchema);