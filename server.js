const express = require("express");
const app = express();
const connectDB = require("./config/db");
const csv = require("csvtojson");
const mongoose = require("mongoose");

const Product = require("./model/Product");

//Connect to Database
connectDB();

// Initialisasi Middleware
app.use(express.json({ extended: false }));

const port = process.env.port || 4501;

//Define Route
app.use("/api/customer", require("./router/api/customer"));
app.use("/api/product", require("./router/api/product"));
app.use("/api/kategori", require("./router/api/kategori"));
app.use("/api/subkategori", require("./router/api/subkategori"));

app.listen(port, () => {
  console.log(`Listen to Port:${port}`);
});

// csv()
//   .fromFile("./barang.csv")
//   .then(jsonObj => {
//     Product.insertMany(jsonObj, (error, docs) => {
//       if (error) {
//         console.log(error);
//       }
//       console.log(docs);
//     });
//   });
