const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    kode: {
      type: String
    },
    nama: {
      type: String,
      required: true
    },
    supplier: {
      type: Schema.Types.ObjectId,
      ref : 'supplier',
      required : true
    },
    kategori: {
      type: Schema.Types.ObjectId,
      ref : 'kategori',
      required : true
    },
    subkategori: {
      type: Schema.Types.ObjectId,
      required : true
    },
    kemasan: {
      type: String,
      required : true
    },
    satuan: {
      type: String,
      required : true
    },
    hargaBeli: {
      type: Number
    },
    hargaJual: {
      type: Number
    },
    berat: {
      type: Number
    },
    stokToko: {
      type: Number
    },
    stokGudang: {
      type: Number
    },
    stokTotal: {
      type: Number
    },
    lokasiToko: {
      type: String
    },
    lokasiGudang: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = Product = mongoose.model("product", ProductSchema);
