const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const path = require('path');
router.use(bodyParser.urlencoded({ extended: false }))
const sqlite3 = require('sqlite3');
db = new sqlite3.Database('data.db');

router.get('/', (req, res) => {
    res.sendFile(path.resolve('public/view/place.html'))
})

router.post('/add', (req, res) => {

    let body = req.body

    let promiseExistCategory = new Promise((resolve, reject) => {
        db.get('SELECT count(*) AS "nb" FROM category WHERE id = ?', body.category, function(err, row) {
            resolve(parseInt(row.nb) === 1)
        })
    })

    promiseExistCategory.then(exist => {
        if(!exist) {
            return res.status(403).send("error-category-not-exist")
        }

        let latitude = parseFloat(body.latitude)
        let longitude = parseFloat(body.longitude)
        let category_id = parseInt(body.category)

        db.run("INSERT INTO place (name,latitude,longitude,category_id) VALUES (?,?,?,?)",
            [body.name, latitude, longitude, category_id], function(err) {
                if (err) {
                    return console.log(err.message);
                  }

            res.send(this.lastID.toString())
        })
    })
})

router.get('/read/:id', (req, res) => {
    let id = req.params.id
    if(isNaN(id)) return res.json('error id is not a integer')

    db.get("SELECT * FROM place WHERE id = ?", id, function(err, row) {
        if(err) return console.log(err.message);

        if(undefined === row) {
            return res.status(404).send('not found')
        }

        return res.send(row)
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

    let body = req.body

    let idPlace = parseInt(body.id)
    let latitude = parseFloat(body.latitude)
    let longitude = parseFloat(body.longitude)
    let category_id = parseInt(body.category)

    db.run("UPDATE place SET name = ?, latitude = ?,longitude = ? ,category_id = ? WHERE id = ?",
        [body.name, latitude, longitude, category_id, idPlace], function(err) {
                if (err) {
                    return console.log(err.message);
                }

            res.send("ok 2")

            }
        )

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
