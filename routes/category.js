const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const path = require('path');
router.use(bodyParser.urlencoded({ extended: false }))
const sqlite3 = require('sqlite3');
db = new sqlite3.Database('data.db');

router.get('/', (req, res) => {
    res.sendFile(path.resolve('public/view/category.html'))
})

router.get('/add', (req, res) => {

    db.run("INSERT INTO category (name) VALUES ('new')")

    db.get('SELECT max(id) "max" FROM category', function(err, allRows) {
        res.json(allRows.max)
    })
})

router.get('/delete/:id', (req, res) => {
    let id = req.params.id
    if(isNaN(id)) return res.json('error id is not a integer')

    let nameCategories = []
    let countForeignKey = new Promise((resolve, reject) => {
        db.all('SELECT name FROM place WHERE category_id = ?', id, (err, result) => {
            result.forEach(e => {
                nameCategories.push(e.name)
            })
            resolve(nameCategories)
        })
    })

    countForeignKey.then(value => {
        if(value.length > 0) {
            res.json(nameCategories)
            return
        }
        let prepare = db.prepare("DELETE FROM category WHERE id = ?")

        prepare.run(id)
        res.send("ok")
    })
    
})

router.post('/update/:id', (req, res) => {
    let id = req.params.id
    if(isNaN(id)) return res.json('error id is not a integer')


    let prepare = db.prepare("UPDATE category SET name = ? WHERE id = ?")

    prepare.run(req.body.text, id)
    res.send("ok")
})

router.get('/list', (req, res) => {

    db.all('SELECT * FROM `category` ORDER BY id DESC;', function(err, allRows) {
        if(err != null){
            console.log(err);
        }

        res.json(allRows);
    })

})

module.exports = router;
