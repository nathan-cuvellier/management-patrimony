const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/head', (req, res) => {
    res.sendFile(path.resolve('public/view/layout/head.html'))
})


router.get('/navbar', (req, res) => {
    res.sendFile(path.resolve('public/view/layout/navbar.html'))
})

router.get('/footer', (req, res) => {
    res.sendFile(path.resolve('public/view/layout/footer.html'))
})

module.exports = router;
