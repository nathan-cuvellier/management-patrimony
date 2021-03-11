const express = require("express")
const bodyParser = require('body-parser')
const sqlite3 = require('sqlite3')
const app = express()
app.use(express.static('public'));
let layoutRouter = require('./routes/layout');
let authentificationRouter = require('./routes/authentification');
let categoryRouter = require('./routes/category');

db = new sqlite3.Database('data.db');

app.use("/public/assets", express.static(__dirname + "/public/assets"))
app.use("/public/img", express.static(__dirname + "/public/img"))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

/*********************************/
/*        Authentification       */
/*********************************/

app.use('/login', authentificationRouter)


/*********************************/
/*            Category           */
/*********************************/

app.use('/layout', layoutRouter)


/*********************************/
/*            Layout           */
/*********************************/

app.use('/category', categoryRouter)


app.get('/create-db', ((req, res) => {
    db.run('DROP TABLE IF EXISTS place')
    db.run('DROP TABLE IF EXISTS category')

    db.run(`
        CREATE TABLE IF NOT EXISTS place
        (
            id          integer PRIMARY KEY AUTOINCREMENT,
            name        varchar,
            latitude    float,
            longitude   float,
            difficulty  integer,
            category_id integer
        );
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS category
        (
            id   integer PRIMARY KEY AUTOINCREMENT,
            name varchar
        );
    `);


    res.send("Done");
}))

app.get('/data-test', ((req, res) => {
    db.run('DELETE FROM `place`')
    db.run('DELETE FROM `category`')
    db.run('INSERT INTO category (name) VALUES (\'Lac\');')
    db.run('INSERT INTO category (name) VALUES (\'Magasin\');')
    db.run('INSERT INTO category (name) VALUES (\'Marché\');')
    db.run('INSERT INTO category (name) VALUES (\'Pont\');')
    db.run('INSERT INTO category (name) VALUES (\'Église\');')
    db.run('INSERT INTO category (name) VALUES (\'Prison\');')
    db.run('INSERT INTO category (name) VALUES (\'Fontaine\');')
    db.run('INSERT INTO category (name) VALUES (\'Rivière\');')

    res.send("Done");
}))


app.get('/categories-list', ((req, res) => {

    db.all('SELECT * FROM `category` ORDER BY id DESC;', function(err, allRows) {
        if(err != null){
            console.log(err);
        }

        res.json(allRows);
    })

}))


app.listen(8081)
