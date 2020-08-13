const express = require('express');
const router = express.Router();

router.get('/makan/:kotak', (req,res) => {
    res.send(`Idnya adalah :${req.params.kotak}`)
})

module.exports = router;