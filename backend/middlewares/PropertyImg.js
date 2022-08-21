// const path = require("path")
// const multer = require("multer")

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "./public/property_images")
//     },
//     filename: (req, file, cb) => {
//         console.log(file)
//         cb(null, Date.now() + path.extname(file.originalname))
//     }
// })

// const upload = multer({ storage: storage })

// var uploadMultiple = upload.fields([{ name: "property1", maxCount: 10 }, { name: "property2", maxCount: 10 }])

// // let cpUpload = upload.fields([
// //     { name: "property", maxCount: 8 },
// //     // { name: "input1", maxCount: 8 }
// // ])

// exports.upload = upload
const path = require("path")
const multer = require("multer")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/property_images")
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

var uploadMultiple = upload.fields([
    { name: "property1", maxCount: 10 },
    { name: "property2", maxCount: 10 }
])

// let cpUpload = upload.fields([
//     { name: "property", maxCount: 8 },
//     // { name: "input1", maxCount: 8 }
// ])

exports.upload = upload
