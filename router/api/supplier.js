const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const _ = require('lodash')

const Supplier = require('../../model/Supplier');
const { default: Axios } = require("axios");

let pN = 1;
let pS = 10;
let nama = "";

const getSupplier = async (req, res) => {
    if (!_.isEmpty(req.query)) {
        const { pageSum, pageNumber, nama } = req.query;
        pN = parseInt(pageNumber);
        pS = parseInt(pageSum);
        nama;
    }
    const totalPage =
        (await Supplier.find({
            nama: new RegExp(".*" + nama + ".*", "i"),
        }).count()) / pS;
    const supplier = await Supplier.find({
        nama: new RegExp(".*" + nama + ".*", "i"),
    })
        .skip((pN - 1) * pS)
        .limit(pS)
        .sort('nama')
    let newArr = [];
    supplier.forEach(item => {
        const final = { id: '', nama: '', alamat: '', notelepon:'' }
        final.id = item._id;
        final.nama = item.nama;
        final.alamat = item.alamat;
        final.notelepon = item.notelepon
        newArr.push(final)
    })
    const rest = {
        newArr,
        totalPage
    }
    res.json(rest);
};

router.get('/', (req, res) => {
    try {
        getSupplier(req, res);
    } catch (error) {
        res.status(500).json({ msg: 'Server Error' })
    }
});
router.get('/all', async (req, res) => {
    try {
        const supplier = await Supplier.find({});
        res.json(supplier);
    } catch (error) {
        res.status(500).json({msg : 'Erro Bra'})
    }
});

router.get('/:id', async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);
        res.json(supplier);
    } catch (error) {
        res.status(500).json({ msg: 'Server Error' });
    }
});



router.post('/',
    [
        check('nama', 'Nama supplier harus diisi').not().isEmpty(),
        check('alamat', 'Alamat supplier harus diisi').not().isEmpty(),
        check('notelepon', 'No telepon supplier harus diisi').not().isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() })
        }
        try {
            const { nama, alamat, notelepon } = req.body;

            const isExist = await Supplier.find({ nama });
            if (isExist.length !== 0) {
                res.status(400).json({ errors: [{ msg: 'Nama supplier sudah ada' }] })
            }


            const supplier = new Supplier({
                nama,
                alamat,
                notelepon
            });
            await supplier.save();
            getSupplier(req, res);
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    })

router.put('/:id',
    [
        check('nama', 'Nama supplier harus diisi').not().isEmpty(),
        check('alamat', 'Alamat supplier harus diisi').not().isEmpty(),
        check('notelepon', 'No telepon supplier harus diisi').not().isEmpty()
    ]
    , async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
        }
        
        try {
            const { nama, alamat, notelepon } = req.body
            await Supplier.findByIdAndUpdate(req.params.id, {
                nama:nama,
                alamat,
                notelepon
            })
           
            getSupplier(req, res)
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    })

router.delete('/:id', async (req, res) => {
    try {
        await Supplier.findByIdAndDelete(req.params.id);

        getSupplier(req, res);
    } catch (error) {
        res.status(500).json({ msg: 'Delete supplier error' })
    }
})

module.exports = router
