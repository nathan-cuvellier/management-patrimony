const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/head', (req, res) => {
    res.sendFile(path.resolve('public/layout/head.html'))
})


router.get('/navbar', (req, res) => {
    res.sendFile(path.resolve('public/layout/navbar.html'))
})

module.exports = router;
