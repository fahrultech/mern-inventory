const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PenjualanSchema = new Schema({
  tanggal: Date,
  faktur: String,
  cust_id: mongoose.Schema.Types.ObjectId,
  user_id: mongoose.Schema.Types.ObjectId
});

module.exports = Penjualan = mongoose.model("penjualan", PenjualanSchema);
