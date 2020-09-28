const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const _ = require('lodash');

const Product = require('../../model/Product');
let pN = 1;
let pS = 10;
let nama = "";

const getProducts = async (req, res) => {
  if (!_.isEmpty(req.query)) {
    const { pageSum, pageNumber, nama } = req.query;
    pN = parseInt(pageNumber);
    pS = parseInt(pageSum);
    nama;
  }
  const totalPage =
    (await Product.find({
      nama: new RegExp(".*" + nama + ".*", "i"),
    }).count()) / pS;

  const product = await Product.find({
    nama: new RegExp(".*" + nama + ".*", "i"),
  })
    .skip((pN - 1) * pS)
    .limit(pS)
    .sort('nama')
    .populate('kategori')
    .populate('supplier')

  let newArr = [];
  product.forEach(item => {

    const final = {
      id: '',
      kode: '',
      nama: '',
      kategori: '',
      supplier: '',
      harga: '',
      stokToko: '',
      stokGudang: '',
      stokTotal: '',
      lokasiToko: '',
      lokasiGudang: ''
    }
    final.id = item._id;
    final.nama = item.nama;
    final.kode = item.kode;
    final.kategori = item.kategori.namaKategori;
    final.supplier = item.supplier.nama;
    final.harga = item.hargaJual;
    final.stokToko = item.stokToko;
    final.stokGudang = item.stokGudang;
    final.stokTotal = item.stokToko + item.stokGudang;
    final.lokasiToko = item.lokasiToko;
    final.lokasiGudang = item.lokasiGudang
    newArr.push(final)
  })
  if (product.length !== 0) {
    const rest = {
      newArr,
      totalPage,
    };
    res.json(rest);
    return
  }
  res.json({});
};

router.get('/', async (req, res) => {
  try {
    getProducts(req, res);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: error.message })
  }
});

router.post('/',
  [
    check('kode', 'Kode produk harus diisi').not().isEmpty(),
    check('nama', 'Nama produk harus diisi').not().isEmpty(),
    check('kategori', 'Kategori belum dipilih').not().isEmpty(),
    check('subkategori', 'Subkategori belum dipilih').not().isEmpty(),
    check('kemasan', 'Nama belum dipilih').not().isEmpty(),
    check('satuan', 'Satuan belum dipilih').not().isEmpty(),
    check('supplier', 'Supplier belum dipilih').not().isEmpty(),
    check('stokToko', 'Stok toko harus berupa angka').isNumeric(),
    check('stokGudang', 'Stok gudang harus berupa angka').isNumeric(),
    check('hargaBeli', 'Harga beli harus berupa angka').isNumeric(),
    check('hargaJual', 'Harga jual harus berupa angka').isNumeric(),
    check('berat', 'Berat harus berupa angka').isNumeric(),
  ],
  async (req, res) => {

    const errors = validationResult(req);

    try {
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
      }
      const {
        kode,
        nama,
        kategori,
        subkategori,
        kemasan,
        satuan,
        supplier,
        berat,
        stokToko,
        stokGudang,
        stokTotal,
        hargaBeli,
        hargaJual,
        lokasiToko,
        lokasiGudang
      } = req.body;

      if ((await Product.find({ nama })).length !== 0) {
        return res.status(400).json({ errors: [{ msg: 'Nama produk sudah ada' }] })
      }
      const product = new Product({
        kode,
        nama,
        kategori,
        subkategori,
        kemasan,
        satuan,
        supplier,
        berat,
        stokToko,
        stokGudang,
        stokTotal,
        hargaBeli,
        hargaJual,
        lokasiToko,
        lokasiGudang
      });
      await product.save();
      getProducts(req, res);

    } catch (error) {
      console.log(error.message)
    }
  });
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    console.log(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    getProducts(req, res)
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: 'Server Error' })
  }
})

router.put('/:id',
  [
    check('nama', 'Nama produk harus diisi').not().isEmpty(),
    check('kategori', 'Kategori belum dipilih').not().isEmpty(),
    check('subkategori', 'Subkategori belum dipilih').not().isEmpty(),
    check('kemasan', 'Kemasan belum dipilih').not().isEmpty(),
    check('satun', 'Satuan belum dipilih').not().isEmpty(),
    check('supplier', 'Supplier belum dipilih').not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    try {
      console.log(req.body)
      const {
        kode,
        nama,
        kategori,
        subkategori,
        kemasan,
        satuan,
        supplier,
        berat,
        stokToko,
        stokGudang,
        stokTotal,
        hargaBeli,
        hargaJual,
        lokasiToko,
        lokasiGudang
      } = req.body;
      const product = await Product.findByIdAndUpdate(
        { _id: req.params.id },
        {
          kode,
          nama,
          kategori,
          subkategori,
          kemasan,
          satuan,
          supplier,
          berat,
          stokToko,
          stokGudang,
          stokTotal,
          hargaBeli,
          hargaJual,
          lokasiToko,
          lokasiGudang
        }
      )
      getProducts(req, res);
    } catch (error) {
      console.log(error.message);
      res.status(500).json(error.response.data.errors)
    }
  })

module.exports = router;
