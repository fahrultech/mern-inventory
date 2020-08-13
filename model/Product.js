const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    kodeBarang: {
      type: String
    },
    namaBarang: {
      type: String,
      required: true
    },
    supplier: {
      type: String
    },
    kodeKategori: {
      type: String
    },
    kodeSubkategori: {
      type: String
    },
    kemasan: {
      type: String
    },
    satuan: {
      type: String
    },
    hpp: {
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
