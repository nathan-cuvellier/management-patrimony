const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const path = require('path');
router.use(bodyParser.urlencoded({ extended: false }))
const sqlite3 = require('sqlite3');
db = new sqlite3.Database('data.db');

router.get('/', (req, res) => {
    res.sendFile(path.resolve('public/place/index.html'))
})

router.get('/add', (req, res) => {

    db.run("INSERT INTO place (name) VALUES ('new')")

    db.get('SELECT max(id) "max" FROM category', function(err, allRows) {
        res.json(allRows.max)
    })
})

router.get('/delete/:id', (req, res) => {
    let id = req.params.id
    if(isNaN(id)) return res.json('error id is not a integer')

    let prepare = db.prepare("DELETE FROM place WHERE id = ?")

    prepare.run(id)
    res.send("ok")
})

router.post('/update/:id', (req, res) => {
    let id = req.params.id
    if(isNaN(id)) return res.json('error id is not a integer')


    let prepare = db.prepare("UPDATE category SET name = ? WHERE id = ?")

    prepare.run(req.body.text, id)
    res.send("ok")
})

router.get('/list', (req, res) => {

    db.all('SELECT * FROM `place` ORDER BY id DESC;', function(err, allRows) {
        if(err != null){
            console.log(err);
        }

        res.json(allRows);
    })

})

module.exports = router;
