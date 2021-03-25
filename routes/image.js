const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const path = require('path');
const fileUpload  = require('express-fileupload')
router.use(bodyParser.urlencoded({ extended: false }))
const sqlite3 = require('sqlite3');
db = new sqlite3.Database('data.db');


router.use(fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
    tempFileDir : '/public/data/'
}));


router.get('/:id', (req, res) => {
    res.sendFile(path.resolve('public/view/image.html'))
})

router.post('/add', (req, res) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        //return res.status(400).send('No files were uploaded.');
    }
    let ext = "" // extension of file
    let timestamp = (new Date()).valueOf()
    if (req.files !== null && req.files.URL !== null) {

        // insert file
        let timestamp = (new Date()).valueOf()

        let images = req.files.images

        /*
         * if a client upload a single file, the data is an object and not an array
         * Need an array in order to use forEach function
         */
        images = !(req.files.images instanceof Array) ?  [images] : images

        images.forEach(image => {
            console.log(image)
            let split = image.name.split('.')
            ext = split[split.length - 1]

            if(image.truncated) return

            image.mv('public/data/' + timestamp + '-' + image.md5 + '.' + ext, function (res)
            {
                let prepare = db.prepare("INSERT INTO image (path, place_id) VALUES (?,?)")
                prepare.run([timestamp + '-' + image.md5 + '.' + ext, parseInt(req.body.place_id)])
            })
        })
    }

    res.redirect('/place/image/' + req.body.place_id)
})

/**
 * id of place
 */
router.get('/read/:id', (req, res) => {
    let id = req.params.id
    if(isNaN(id)) return res.json('error id is not a integer')

    db.get("SELECT * FROM image WHERE place_id = ?", id, function(err, row) {
        if(err) return console.log(err.message)

        if(undefined === row) {
            return res.status(404).send('not found')
        }

        return res.send(row)
    })
})

/**
 * id of image
 */
router.get('/delete/:id', (req, res) => {
    let id = req.params.id
    if(isNaN(id)) return res.json('error id is not a integer')

    let prepare = db.prepare("DELETE FROM image WHERE id = ?")

    prepare.run(id)
    res.send("ok")
})

/**
 * id of place
 */
router.get('/list/:id', (req, res) => {
    let id = req.params.id
    if(isNaN(id)) return res.json('error id is not a integer')

    db.all("SELECT * FROM image WHERE place_id = ? ORDER BY id DESC", id, function(err, allRows) {
        if(err) return console.log(err.message)

        res.json(allRows);
    })

})

module.exports = router;
