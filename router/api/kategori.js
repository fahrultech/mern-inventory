const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");

const Kategori = require("../../model/Kategori");

router.get("/", async (req, res) => {
  try {
    const { pageSum, pageNumber, namaKategori } = req.query
    const pN = parseInt(pageNumber);
    const pS = parseInt(pageSum);
    const totalPage = await Kategori.find({namaKategori: new RegExp('.*' + namaKategori + '.*' ,'i') }).count()/pS;
    console.log(totalPage)
    const kategori = await Kategori.find({namaKategori: new RegExp('.*' + namaKategori + '.*' ,'i') }).skip((pN-1)*pS).limit(pS);
    const rest = {
      kategori,
      totalPage
    }
    res.json(rest);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", async(req,res) => {
  try {
    const kategori = await Kategori.findById(req.params.id);
    res.json(kategori)
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})

router.post(
  "/",
  [
    check("namaKategori", "Nama Kategori Harus Di Masukkan")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { namaKategori } = req.body;
    const findName = await Kategori.find({namaKategori})
    console.log(findName)
    if(findName.length !== 0){
      return res.status(400).json({errors: [{msg: 'Nama Kategori Sudah Ada'}]});
    }
    try {
      let kategori = new Kategori({
        namaKategori
      });

      await kategori.save();
      const totalPage = await Kategori.count();
      //kategori = await Kategori.find().skip((pN-1)*pS).limit(pS);
      kategori = await Kategori.find();
      res.json(kategori);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.delete('/:id', async (req, res) => {
  try {
    let kategori = await Kategori.findByIdAndDelete(req.params.id);
    const totalPage = await Kategori.count();
    kategori = await Kategori.find().skip((pN-1)*pS).limit(pS);
    const rest = {
      kategori,
      totalPage
    }
    res.json(rest);
  } catch (error) {
    
  }
})

router.put('/:id', async(req, res) => {
  const { namaKategori } = req.body;
  const kategori = await Kategori.findByIdAndUpdate({_id:req.params.id},{namaKategori})
})

module.exports = router;
