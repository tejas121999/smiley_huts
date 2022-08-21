require("dotenv").config()
const accessLogMiddleware = require("./middlewares/logger.middleware")
const routes = require("./routes/api")
var bodyParser = require("body-parser")

const express = require("express")
const app = express()
const cors = require("cors")

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(express.static(__dirname + "/public/property_images"))

// Req and Res logger.
app.use(accessLogMiddleware)

app.use(express.static("public"))
app.use("/profile", express.static("profile"))

app.use("/api", routes)

module.exports = app
