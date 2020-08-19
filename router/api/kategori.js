const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const _ = require("lodash");

const Kategori = require("../../model/Kategori");
let pN;
let pS;

let pN = 1;
let pS = 10;
let nama = "";

const getKategoris = async (req, res) => {
  if (!_.isEmpty(req.query)) {
    const { pageSum, pageNumber, namaKategori } = req.query;
    pN = parseInt(pageNumber);
    pS = parseInt(pageSum);
    nama = namaKategori;
  }
  const totalPage =
    (await Kategori.find({
      namaKategori: new RegExp(".*" + nama + ".*", "i"),
    }).count()) / pS;
  const kategori = await Kategori.find({
    namaKategori: new RegExp(".*" + nama + ".*", "i"),
  })
    .skip((pN - 1) * pS)
    .limit(pS)
    .sort('namaKategori');
  const rest = {
    kategori,
    totalPage,
  };
  res.json(rest);
};

router.get("/", (req, res) => {
  try {
<<<<<<< HEAD
    getKategoris(req, res);
=======
    const { pageSum, pageNumber, namaKategori } = req.query
    pN = parseInt(pageNumber);
    pS = parseInt(pageSum);
    const totalPage = Math.ceil(await Kategori.find({namaKategori: new RegExp('.*' + namaKategori + '.*' ,'i') }).countDocuments()/pS);
    const kategori = await Kategori.find({namaKategori: new RegExp('.*' + namaKategori + '.*' ,'i') }).skip((pN-1)*pS).limit(pS).sort({namaKategori:'desc'});
    
    const rest = {
      kategori,
      totalPage
    }
    res.json(rest);
>>>>>>> 103856a0b7b6421f7dc77e16503ee6b6464c758a
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const kategori = await Kategori.findById(req.params.id);
    res.json(kategori);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post(
  "/",
  [check("namaKategori", "Nama Kategori Harus Di Masukkan").not().isEmpty()],
  async (req, res) => {
    console.log(req.query);
    const errors = validationResult(req.body);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { namaKategori } = req.body;
    const findName = await Kategori.find({ namaKategori });

    if (findName.length !== 0) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Nama Kategori Sudah Ada" }] });
    }
    try {
      const kategori = new Kategori({
        namaKategori,
      });
      await kategori.save();
<<<<<<< HEAD
      getKategoris(req, res);
=======
      const totalPage = Math.ceil(await Kategori.countDocuments()/pS);
      kategori = await Kategori.find().skip((pN-1)*pS).limit(pS);
      //kategori = await Kategori.find();
      const rest = {
        kategori,
        totalPage
      }
      res.json(rest);
>>>>>>> 103856a0b7b6421f7dc77e16503ee6b6464c758a
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.delete("/:id", async (req, res) => {
  try {
    await Kategori.findByIdAndDelete(req.params.id);
    res.json({ msg: "Kategori Deleted" });
  } catch (error) {}
});

router.put("/:id", async (req, res) => {
  try {
    const { namaKategori } = req.body;
    const kategori = await Kategori.findByIdAndUpdate(
      { _id: req.params.id },
      { namaKategori }
    );
    getKategoris(req,res)
  } catch (error) {}
});

module.exports = router;
