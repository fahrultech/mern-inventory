const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const _ = require("lodash");

const Subkategori = require("../../model/Subkategori");

let pN = 1;
let pS = 10;
let nama = "";

const getSubkategoris = async (req, res) => {
  if (!_.isEmpty(req.query)) {
    const { pageSum, pageNumber, namaSubkategori } = req.query;
    pN = parseInt(pageNumber);
    pS = parseInt(pageSum);
    nama = namaSubkategori;
  }
  const totalPage =
    (await Subkategori.find({
      namaSubkategori: new RegExp(".*" + nama + ".*", "i"),
    }).count()) / pS;
  const subkategori = await Subkategori.find({
    namaSubkategori: new RegExp(".*" + nama + ".*", "i"),
  })
    .skip((pN - 1) * pS)
    .limit(pS)
    .sort('namaSubkategori');
  const rest = {
    subkategori,
    totalPage,
  };
  res.json(rest);
};

router.get("/", (req, res) => {
  try {
    getSubkategoris(req, res)
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const subkategori = await Subkategori.findById(req.params.id);
    res.json(subkategori);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post(
  "/",
  [
      check("namaSubkategori", "Nama Subkategori Harus Di Masukkan").not().isEmpty(),
      check("categoryId", "Kategori Harus Di Masukkan").not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req.body);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { namaSubkategori, categoryId } = req.body;
    const findName = await Kategori.find({ namaSubkategori });

    if (findName.length !== 0) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Nama Subkategori Sudah Ada" }] });
    }
    try {
      const subkategori = new Kategori({
        namaKategori,
        categoryId
      });
      await subkategori.save();
      const totalPage = Math.ceil(await Subkategori.countDocuments()/pS);
      subkategori = await Kategori.find().skip((pN-1)*pS).limit(pS);
      
      const rest = {
        subkategori,
        totalPage
      }
      res.json(rest);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.delete("/:id", async (req, res) => {
  try {
    await Subkategori.findByIdAndDelete(req.params.id);
    res.json({ msg: "Subkategori Deleted" });
  } catch (error) {}
});

router.put("/:id", async (req, res) => {
  try {
    const { namaSubkategori } = req.body;
    const subkategori = await Subkategori.findByIdAndUpdate(
      { _id: req.params.id },
      { namaKategori },
      { categoryId }
    );
    getSubkategoris(req,res)
  } catch (error) {}
});

module.exports = router;
