const express = require("express")
const app = express()

app.use("/public/assets", express.static(__dirname + "/public/assets"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

app.listen(8080)
