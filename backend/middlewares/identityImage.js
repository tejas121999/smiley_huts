const express = require("express")
const path = require("path")
const multer = require("multer")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/identity_proof")
    },
    filename: (req, file, cb) => {
        // console.log(file)

        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

exports.upload = upload
