const express = require("express")
const bodyParser = require('body-parser')
const helmet = require("helmet");
const app = express()
app.use(helmet());
app.use(express.static('public'));
let authentificationRouter = require('./routes/authentification');
let homeRouter = require('./routes/home');

app.use("/public/assets", express.static(__dirname + "/public/assets"))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

/*********************************/
/*        authentification       */
/*********************************/

app.use('/login', authentificationRouter)

/*
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})*/


app.listen(8080)
