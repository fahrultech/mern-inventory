const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  res.send("Product Get");
});

module.exports = router;
