// const { User, Property, Famaly, Review } = require("../models")

// exports.uploadProfilImg = async (req, res) => {
//     try {
//         const id = req.params.id
//         if (req.file) {
//             const pathName = req.file.filename

//             const profileImg = await User.update(
//                 { user_img: pathName },
//                 { where: { id } }
//             )
//             if (!profileImg) {
//                 return res.status(401).json({
//                     message: "Failed to uploade"
//                 })
//             } else {
//                 return res.status(200).json({
//                     message: "image uploades successfully",
//                     path: pathName
//                 })
//             }
//         }
//     } catch (error) {
//         console.error(err.message)
//         res.status(500).send("Server Error")
//     }
// }

// exports.uploadPropertyImg = async (req, res) => {
//     try {
//         const id = req.params.id
//         var file = req.files

//         var filenameArray = []

//         file.map((fileName) => {
//             filenameArray.push(fileName.filename)
//         })

//         var isSuccess = false

//         const userData = await User.findOne({
//             where: {
//                 id: req.params.id
//             }
//         })

//         let property = await Property.findOne({
//             where: {
//                 user_id: id
//             }
//         })
//             .then((propt) => {
//                 isSuccess = true
//                 Property.update(
//                     {
//                         pro_img: JSON.stringify(filenameArray)
//                     },
//                     {
//                         where: {
//                             id: propt.id
//                         }
//                     }
//                 )
//             })
//             .catch((err) => res.status(400).send(err))

//         if (isSuccess == false) {
//             return res.status(401).json({
//                 message: "Failed to uploade"
//             })
//         } else {
//             return res.status(200).json({
//                 status: 200,
//                 userData: userData,
//                 message: "image uploades successfully",
//                 path: property
//             })
//         }
//     } catch (error) {
//         console.error("Errrrrr----------------------", error)
//         res.status(500).send("Server Error")
//     }
// }

// exports.uploadFamalyMemberImg = async (req, res) => {
//     try {
//         const id = req.params.id
//         if (req.file) {
//             const pathName = req.file.filename

//             const famalyMemberImg = await Famaly.update(
//                 { family_member_img: pathName },
//                 { where: { id } }
//             )
//             if (!famalyMemberImg) {
//                 return res.status(401).json({
//                     message: "Failed to uploade"
//                 })
//             } else {
//                 return res.status(200).json({
//                     message: "image uploades successfully",
//                     path: pathName
//                 })
//             }
//         }
//     } catch (error) {
//         console.error(err.message)
//         res.status(500).send("Server Error")
//     }
// }

// exports.uploadIdentityImg = async (req, res) => {
//     try {
//         const id = req.params.id
//         if (req.file) {
//             const pathName = req.file.filename

//             const profileImg = await User.update(
//                 { user_id_proof: pathName },
//                 { where: { id } }
//             )
//             if (!profileImg) {
//                 return res.status(401).json({
//                     message: "Failed to uploade"
//                 })
//             } else {
//                 return res.status(200).json({
//                     message: "image uploades successfully",
//                     path: pathName
//                 })
//             }
//         }
//     } catch (error) {
//         console.error(err.message)
//         res.status(500).send("Server Error")
//     }
// }

// exports.uploadReviewImage = async (req, res) => {
//     try {
//         const id = req.params.id
//         if (req.file) {
//             const pathName = req.file.filename
//             console.log(req.file)
//             const reviewImg = await Review.update(
//                 { review_imgs: pathName },
//                 { where: { id } }
//             )
//             if (!reviewImg) {
//                 return res.status(401).json({
//                     message: "Failed to uploade"
//                 })
//             } else {
//                 return res.status(200).json({
//                     message: "image uploades successfully",
//                     path: pathName
//                 })
//             }
//         }
//     } catch (error) {
//         console.error(err.message)
//         res.status(500).send("Server Error")
//     }
// }

const {
    User,
    Property,
    Famaly,
    Review,
    NewPropertyImages
} = require("../models")

exports.uploadProfilImg = async (req, res) => {
    try {
        const id = req.params.id
        if (req.file) {
            const pathName = req.file.filename

            const profileImg = await User.update(
                { user_img: pathName },
                { where: { id } }
            )
            if (!profileImg) {
                return res.status(401).json({
                    message: "Failed to uploade"
                })
            } else {
                return res.status(200).json({
                    message: "image uploades successfully",
                    path: pathName
                })
            }
        }
    } catch (error) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

exports.uploadPropertyImg = async (req, res) => {
    try {
        const id = req.params.id
        var file = req.files

        var filenameArray = []

        file.map((fileName) => {
            filenameArray.push(fileName.filename)
        })

        var isSuccess = false

        const userData = await User.findOne({
            where: {
                id: req.params.id
            }
        })

        let property = await Property.findOne({
            where: {
                user_id: id
            }
        })
            .then((propt) => {
                console.log(
                    "filenameArray===========================",
                    filenameArray
                )
                isSuccess = true
                Property.update(
                    {
                        pro_img: JSON.stringify(filenameArray)
                        // pro_img: JSON.stringify(filenameArray)
                    },
                    {
                        where: {
                            id: propt.id
                        }
                    }
                )
            })
            .catch((err) => console.log("Error=================", err))
        // .catch((err) => res.status(400).json({message:"Server Error"}))

        if (isSuccess == false) {
            return res.status(401).json({
                message: "Failed to uploade"
            })
        } else {
            return res.status(200).json({
                // status: 200,
                userData: userData,
                message: "image uploades successfully"
                // path: property
            })
        }
    } catch (error) {
        console.error("Errrrrr----------------------", error)
        return res.status(500).json({ message: "Server Error" })
    }
}

exports.uploadFamalyMemberImg = async (req, res) => {
    // try {
    //     const id = req.params.id
    //     var file = req.files

    //     var filenameArray = []

    //     file.map((fileName) => {
    //         filenameArray.push(fileName.filename)
    //     })

    //     var isSuccess = false

    //     const userData = await Famaly.findOne({
    //         where: {
    //             id: req.params.id
    //         }
    //     })

    //         // let property = await Property.findOne({
    //         //     where: {
    //         //         user_id: id
    //         //     }
    //         // })
    //         .then((propt) => {
    //             console.log(
    //                 "filenameArray===========================",
    //                 filenameArray
    //             )
    //             isSuccess = true
    //             Famaly.update(
    //                 {
    //                     family_member_img: JSON.stringify(filenameArray)
    //                     // pro_img: JSON.stringify(filenameArray)
    //                 },
    //                 {
    //                     where: {
    //                         id: req.params.id
    //                     }
    //                 }
    //             )
    //         })
    //         .catch((err) => console.log("Error=================", err))
    //     // .catch((err) => res.status(400).json({message:"Server Error"}))

    //     if (isSuccess == false) {
    //         return res.status(401).json({
    //             message: "Failed to uploade"
    //         })
    //     } else {
    //         return res.status(200).json({
    //             // status: 200,
    //             // userData: userData,
    //             message: "image uploades successfully"
    //             // path: property
    //         })
    //     }
    // } catch (error) {
    //     console.error("Errrrrr----------------------", error)
    //     return res.status(500).json({ message: "Server Error" })
    // }
    try {
        const id = req.params.id
        if (req.file) {
            // const famaily = req.body.family
            // req.files.map(async (file, index) => {
            const pathName = req.file.filename

            const famalyMemberImg = await Famaly.update(
                { family_member_img: pathName },
                { where: { id: id } }
            )

            if (!famalyMemberImg) {
                return res.status(401).json({
                    message: "Failed to uploade"
                })
            } else {
                return res.status(200).json({
                    message: "image uploades successfully",
                    path: pathName
                })
            }
        }

        // if (req.file) {
        //     console.log(req)
        //     const pathName = req.file.filename
        //     console.log(req.file)
        //     const PropertyImg = await Property.update(
        //         { pro_img: pathName },
        //         { where: { id } }
        //     )
        //     if (!PropertyImg) {
        //         return res.status(401).json({
        //             message: "Failed to uploade"
        //         })
        //     } else {
        //         return res.status(200).json({
        //             message: "image uploades successfully",
        //             path: pathName
        //         })
        //     }
        // }
    } catch (error) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

exports.uploadIdentityImg = async (req, res) => {
    try {
        const id = req.params.id
        if (req.file) {
            const pathName = req.file.filename

            const profileImg = await User.update(
                { user_id_proof: pathName },
                { where: { id } }
            )
            if (!profileImg) {
                return res.status(401).json({
                    message: "Failed to uploade"
                })
            } else {
                return res.status(200).json({
                    message: "image uploades successfully",
                    path: pathName
                })
            }
        }
    } catch (error) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

exports.uploadReviewImage = async (req, res) => {
    try {
        const id = req.params.id
        if (req.file) {
            const pathName = req.file.filename
            console.log(req.file)
            const reviewImg = await Review.update(
                { review_imgs: pathName },
                { where: { id } }
            )
            if (!reviewImg) {
                return res.status(401).json({
                    message: "Failed to uploade"
                })
            } else {
                return res.status(200).json({
                    message: "image uploades successfully",
                    path: pathName
                })
            }
        }
    } catch (error) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

exports.uploadNewPropertyImg = async (req, res) => {
    try {
        const id = req.params.id
        var file = req.files

        var filenameArray = []

        file.map((fileName) => {
            filenameArray.push(fileName.filename)
        })

        var isSuccess = false

        const userData = await User.findOne({
            where: {
                id: req.params.id
            }
        })

        let property = await NewPropertyImages.findOne({
            where: {
                id: id
            }
        })
            .then((propt) => {
                isSuccess = true
                NewPropertyImages.update(
                    {
                        prop_img: JSON.stringify(filenameArray)
                    },
                    {
                        where: {
                            id: propt.id
                        }
                    }
                )
            })
            .catch((err) => res.status(400).send(err))

        if (isSuccess == false) {
            return res.status(401).json({
                message: "Failed to uploade"
            })
        } else {
            return res.status(200).json({
                status: 200,
                userData: userData,
                message: "image uploades successfully",
                path: property
            })
        }
    } catch (error) {
        console.error("Errrrrr----------------------", error)
        res.status(500).send("Server Error")
    }
}

exports.UpdateAndRemoveImage = async () => {
    try {
        const id = req.body.user_id
        console.log("id ===", id)
        NewPropertyImages.destroy({
            where: {
                id: req.body.user_id
            }
        })
            .then(() => {
                res.status(200).json("Successfully Deleted")
            })
            .catch((err) => console.log(err))
    } catch (err) {
        console.log(err)
    }
}




