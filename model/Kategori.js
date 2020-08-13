const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const KategoriSchema = new Schema({
  namaKategori: {
    type: String,
    required: true
  }
});

module.exports = Kategori = mongoose.model("kategori", KategoriSchema);
