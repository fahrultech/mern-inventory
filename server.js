const express = require("express");
const app = express();
const connectDB = require("./config/db");
const csv = require("csvtojson");
const mongoose = require("mongoose");
const ExportToCsv = require('export-to-csv');

const Subkategori = require("./model/Subkategori");

//Connect to Database
connectDB();

// Initialisasi Middleware
app.use(express.json({ extended: false }));

const port = process.env.port || 4500;

//Define Route
app.use("/api/customer", require("./router/api/customer"));
app.use("/api/product", require("./router/api/product"));
app.use("/api/kategori", require("./router/api/kategori"));
app.use("/api/subkategori", require("./router/api/subkategori"));
app.use("/api/supplier", require("./router/api/supplier"));

app.listen(port, () => {
  console.log(`Listen to Port:${port}`);
});

// csv()
//   .fromFile("./sub_kategori.csv")
//   .then(jsonObj => {
//     console.log(jsonObj)
//     Subkategori.insertMany(jsonObj, function(error,docs){})
//     // Product.insertMany(jsonObj, (error, docs) => {
//     //   if (error) {
//     //     console.log(error);
//     //   }
//     //   console.log(docs);
//     // });
//   });
