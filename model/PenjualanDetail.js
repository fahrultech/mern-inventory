const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PenjualanDetailSchema = new Schema({
    faktur : String,
    prd_id: mongoose.ObjectId,
    qty: Number,
    diskon: Number
});

module.exports = PenjualanDetail = mongoose.model('penjualandetail', PenjualanDetailSchema);