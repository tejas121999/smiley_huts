// const methods = require("../helpers/methods")
const { Property, Famaly } = require("../models")
const { User, sequelize, Setting } = require("../models")
const bcrypt = require("bcrypt")
const { createTokens, validateToken } = require("../middlewares/JWT")
const { body } = require("express-validator")
const multer = require("multer")
const { Op } = require("sequelize")
const mailer = require("nodemailer")
var crypto = require("crypto")
const { v4: uuidv4 } = require("uuid")
// login

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const users = await User.findOne({ where: { email: email } })
        console.log("Users---------------------------------", users)

        if (!users || users == null) {
            return res.status(400).json({ msg: "User does not exist." })
        }
        const dbPassword = users.password
        bcrypt.compare(password, dbPassword).then((match) => {
            if (!match) {
                res.status(400).json({
                    error: "Wrong Username and Password Combination!"
                })
            } else {
                const accessToken = createTokens(users)
                console.log("access_token", accessToken)

                req.header("x-auth-token", accessToken, {
                    maxAge: 60 * 60 * 24 * 30 * 1000,
                    httpOnly: true
                })
                //
                if (accessToken) {
                    return res.status(200).json({
                        message: "User login successful",
                        Token: accessToken,
                        user: users
                    })
                }
            }
        })
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

exports.googleLogin = async (req, res) => {
    try {
        const email = req.body.email
        const users = await User.findOne({ where: { email: email } })
        console.log("Users---------------------------------", users)

        if (!users || users == null) {
            return res.status(400).json({ msg: "User does not exist." })
        } else {
            const accessToken = createTokens(users)
            console.log("access_token", accessToken)

            req.header("x-auth-token", accessToken, {
                maxAge: 60 * 60 * 24 * 30 * 1000,
                httpOnly: true
            })
            //
            if (accessToken) {
                return res.status(200).json({
                    message: "User login successful",
                    Token: accessToken,
                    user: users
                })
            }
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

// registeration

exports.googleRegister = async (req, res) => {
    try {
        const { email } = req.body

        const users = await User.findOne({ where: { email: email } })
        if (users) {
            return res.status(400).json({ msg: "User already exists" })
        }

        User.create({
            email: email
        })
            .then((userData) => {
                const accessToken = createTokens(userData)
                console.log("access_token", accessToken)

                req.header("x-auth-token", accessToken, {
                    maxAge: 60 * 60 * 24 * 30 * 1000,
                    httpOnly: true
                })
                return res.status(200).json({
                    message: "User register successful",
                    user: userData,
                    Token: accessToken
                })
            })
            .catch((err) => {
                if (err) {
                    res.status(400).json({ error: err })
                }
            })
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

exports.registration = async (req, res) => {
    try {
        const { email, password } = req.body

        const users = await User.findOne({ where: { email: email } })
        if (users) {
            return res.status(400).json({ msg: "User already exists" })
        }
        var smtpProtocol = mailer.createTransport({
            service: "Gmail",
            auth: {
                user: "prathamesh.malondkar@aasa.tech",
                pass: "fiuvaqxkqzuobcfg"
            }
        })
        let email_Token = uuidv4()
        const mailOptions = {
            from: "prathamesh.malondkar@aasa.tech",
            to: req.body.email,
            subject: "Account Activation.",
            // html: `<p>Please reset your password</p>
            // <a href="http://localhost:5000/api/auth/verifyEmail?token=${email_Token}">verify</a>`
            html: `<!DOCTYPE html>
            <html>
            
            <head>
                <title></title>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <style type="text/css">
                    @media screen {
                        @font-face {
                            font-family: 'Lato';
                            font-style: normal;
                            font-weight: 400;
                            src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
                        }
            
                        @font-face {
                            font-family: 'Lato';
                            font-style: normal;
                            font-weight: 700;
                            src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
                        }
            
                        @font-face {
                            font-family: 'Lato';
                            font-style: italic;
                            font-weight: 400;
                            src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
                        }
            
                        @font-face {
                            font-family: 'Lato';
                            font-style: italic;
                            font-weight: 700;
                            src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
                        }
                    }
            
                    /* CLIENT-SPECIFIC STYLES */
                    body,
                    table,
                    td,
                    a {
                        -webkit-text-size-adjust: 100%;
                        -ms-text-size-adjust: 100%;
                    }
            
                    table,
                    td {
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                    }
            
                    img {
                        -ms-interpolation-mode: bicubic;
                    }
            
                    /* RESET STYLES */
                    img {
                        border: 0;
                        height: auto;
                        line-height: 100%;
                        outline: none;
                        text-decoration: none;
                    }
            
                    table {
                        border-collapse: collapse !important;
                    }
            
                    body {
                        height: 100% !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        width: 100% !important;
                    }
            
                    /* iOS BLUE LINKS */
                    a[x-apple-data-detectors] {
                        color: inherit !important;
                        text-decoration: none !important;
                        font-size: inherit !important;
                        font-family: inherit !important;
                        font-weight: inherit !important;
                        line-height: inherit !important;
                    }
            
                    /* MOBILE STYLES */
                    @media screen and (max-width:600px) {
                        h1 {
                            font-size: 32px !important;
                            line-height: 32px !important;
                        }
                    }
            
                    /* ANDROID CENTER FIX */
                    div[style*="margin: 16px 0;"] {
                        margin: 0 !important;
                    }
                </style>
            </head>
            
            <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
                <!-- HIDDEN PREHEADER TEXT -->
                <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account.
                </div>
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <!-- LOGO -->
                    <tr>
                        <td bgcolor="#FFA73B" align="center">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                <tr>
                                    <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#FFA73B" align="center" style="padding: 0px 10px 0px 10px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                <tr>
                                    <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                        <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Welcome!</h1> <img src=" https://img.icons8.com/clouds/100/000000/handshake.png" width="125" height="120" style="display: block; border: 0px;" />
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                <tr>
                                    <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                        <p style="margin: 0;">We're excited to have you get started. First, you need to confirm your account. Just press the button below.</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td bgcolor="#ffffff" align="left">
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                                    <table border="0" cellspacing="0" cellpadding="0">
                                                        <tr>
                                                            <td align="center" style="border-radius: 3px;" bgcolor="#FFA73B"><a href="https://api.smileyhuts.com/api/auth/verifyEmail?token=${email_Token}" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #FFA73B; display: inline-block;">Confirm Account</a></td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr> <!-- COPY -->
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
            
            </html>`
        }
        smtpProtocol.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err)
            }
        })

        bcrypt.hash(password, 10).then((hash) => {
            User.create({
                email: email,
                password: hash,
                emailToken: email_Token
            })
                .then((userData) => {
                    const accessToken = createTokens(userData)
                    console.log("access_token", accessToken)

                    req.header("x-auth-token", accessToken, {
                        maxAge: 60 * 60 * 24 * 30 * 1000,
                        httpOnly: true
                    })

                    return res.status(200).json({
                        message: "User register successful",
                        user: userData,
                        Token: accessToken
                    })
                    localStorage.setItem('access-token', accessToken)
                })
                .catch((err) => {
                    if (err) {
                        res.status(400).json({ error: err })
                    }
                })
        })
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

exports.verifyEmail = async (req, res) => {
    const token = req.query.token
    // const users = await User.findOne({ where: { email: email } })

    console.log("ddddddddddddddddddddddddd", token)
    try {
        const user = await User.findOne({
            where: {
                emailToken: token
            }
        })
            .then(() => {
                User.update(
                    {
                        isVerified: 1,
                        emailToken: ""
                    },
                    {
                        where: {
                            emailToken: token
                        }
                    }
                )
            })
            .then(() => {
                // const accessToken = createTokens(users)
                // console.log("access_token", accessToken)

                // req.header("x-auth-token", accessToken, {
                //     maxAge: 60 * 60 * 24 * 30 * 1000,
                //     httpOnly: true
                // })
                // //
                // if (accessToken) {
                //     return res.status(200).json({
                //         message: "User login successful",
                //         Token: accessToken,
                //         user: users
                //     })
                // }
                res.redirect("https://smileyhuts.com/create_profile")
            })
            .catch((err) => res.status(400).json("Not authenticated"))
    } catch (err) {
        console.log(err)
    }
}

// logout

exports.logout = async (req, res) => {
    try {
        const user = req.body

        const deleteToken = await User.bulkCreate([{ rememberToken: null }], {
            updateOnDuplicate: ["email"]
        }).then(() => {
            return User.update(
                { rememberToken: null },
                { where: { email: User.email } }
            )
        })
        if (!deleteToken[0]) {
            res.status(400).json({
                message: "Failed to Logout"
            })
        } else {
            res.status(200).json({
                message: "Logout Successfully"
            })
        }

        // logout.logoutUser(req, res, function (err, data) {
        //     if (err) {
        //         res.json({ 'error': data.error, 'message': data.message });
        //     } else {
        //         res.json({ 'success': data.success, 'message': data.message });
        //     }
        // })
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

// get profile
exports.getProfile = async (req, res) => {
    try {
        const id = req.body
        const users = await User.findAll()
        if (!users) {
            return res.status(400).json({
                msg: "There is no profile for this user"
            })
        }
        res.json(users)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

exports.getActiveCount = async (req, res) => {
    try {
        const id = req.body
        const users = await User.count(
            { where: { isActive: true } },
            { distinct: "id" }
        )
        if (!users) {
            return res.status(400).json({
                msg: "There is no profile for this user"
            })
        }
        res.json(users)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

//get profile is Active
exports.getActive = async (req, res) => {
    try {
        const id = req.body.id
        const users = await User.findAll({ where: { isActive: true } })
        if (!users) {
            return res.status(400).json({
                msg: "There is no profile for this user"
            })
        }
        res.json(users)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

exports.deActive = async (req, res) => {
    try {
        const id = req.body
        const users = await User.findAll({ where: { isActive: false } })
        if (!users) {
            return res.status(400).json({
                msg: "There is no profile for this user"
            })
        }
        res.json(users)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

//get Active member count

exports.getActiveCountMembers = async (req, res) => {
    try {
        const id = req.body
        const users = await User.count({ where: { isActive: true } })
        if (!users) {
            return res.status(400).json({
                msg: "There is no profile for this user"
            })
        }
        res.json(users)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

//get Deactive Count
exports.getDeactiveCountMembers = async (req, res) => {
    try {
        const id = req.body
        const users = await User.count({ where: { isActive: false } })
        if (!users) {
            return res.status(400).json({
                msg: "There is no profile for this user"
            })
        }
        res.json(users)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

//get total count of users
exports.getTotalUsers = async (req, res) => {
    try {
        const id = req.body
        const users = await User.count()
        if (!users) {
            return res.status(400).json({
                msg: "There is no profile for this user"
            })
        }
        res.json(users)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

// create profile
// exports.createProfile = async (req, res) => {
//     try {
//         // let propertyData

//         const email = req.body.email
//         const user = await User.findOne({ where: { email: email } })
//         console.log("444444444444444444444444444", email)
//         if (!user) {
//             return res.status(401).json({
//                 message: "user not found"
//             })
//         } else {
//             const user = User.findOne({ where: { email: email } })
//                 .then((user_obj) => {
//                     User.update(
//                         {
//                             famaly_members_count:
//                                 req.body.famalyMember_count ||
//                                 user_obj.famaly_members_count,
//                             first_name:
//                                 req.body.first_name || user_obj.first_name,
//                             last_name: req.body.last_name || user_obj.last_name,
//                             contact_number:
//                                 req.body.contact_number ||
//                                 user_obj.contact_number,
//                             address: req.body.address || user_obj.address,
//                             user_img: req.body.user_img || user_obj.user_img,
//                             user_id_proof:
//                                 req.body.user_id_proof ||
//                                 user_obj.user_id_proof,
//                             having_pet:
//                                 req.body.having_pet || user_obj.having_pet,
//                             isApproved:
//                                 req.body.isApproved || user_obj.isApproved,
//                             isActive: 0
//                         },
//                         {
//                             where: {
//                                 email: email
//                             }
//                         }
//                     )

//                     Property.create({
//                         prop_type: req.body.prop_type || user_obj.prop_type,
//                         prop_address:
//                             req.body.prop_address || user_obj.prop_address,
//                         street_name:
//                             req.body.street_name || user_obj.street_name,
//                         pincode: req.body.pincode || user_obj.pincode,
//                         landmark: req.body.landmark || user_obj.landmark,
//                         pro_img: req.body.pro_img || user_obj.pro_img,
//                         review: req.body.review || user_obj.review,
//                         photo_req: req.body.photo_req || user_obj.photo_req,
//                         user_id: req.body.user_id || user_obj.user_id,
//                         lat: req.body.lat || user_obj.lat,
//                         lon: req.body.lon || user_obj.lon
//                     })
//                     let fami = []
//                     req.body.family.map((fam) => {
//                         const family = Famaly.create({
//                             fam_user_id: req.body.user_id || user_obj.user_id,
//                             member_name:
//                                 fam.member_name || user_obj.member_name,
//                             member_relation:
//                                 fam.member_relation || user_obj.member_relation
//                         })
//                         fami.push(family)
//                     })
//                     // res.json(propertyData)
//                 })
//                 .then(async (resData) => {
// const user1 = await User.findOne({
//     where: {
//         email: req.body.email
//     }
// })
//     // .then(async () => {
//     //     console.log("777777777777777777", user1)
//         const familyData = await Famaly.findAll({
//             where: {
//                 fam_user_id: user1.id
//             }
//         })
//                         // })
//                         .then(() => {
//                             // console.log("000000000000", familyData)
//                             res.status(200).json({
//                                 message: "User updated",
//                                 user: user,
//                                 family: familyData
//                                 // fami: "fvd"
//                             })
//                         })
//                 })

//                 .catch((err) => {
//                     res.status(400).send(err)
//                 })
//         }
//     } catch (err) {
//         console.error(err.message)
//         res.status(500).send("Server Error")
//     }
// }

// exports.createProfile = async (req, res) => {
//     try {
//         let famData = []
//         // let propertyData
//         const email = req.body.email
//         const user = await User.findOne({ where: { email: email } })
//         if (!user) {
//             return res.status(401).json({
//                 message: "user not found"
//             })
//         } else {
//             User.findOne({ where: { email: email } }).then((user_obj) => {
//                 console.log("user_obj =========================", user_obj)
//                 console.log("req body ==========================", req.body)
//                 User.update(
//                     {
//                         famaly_members_count:
//                             req.body.famalyMember_count ||
//                             user_obj.famaly_members_count,
//                         first_name: req.body.first_name || user_obj.first_name,
//                         last_name: req.body.last_name || user_obj.last_name,
//                         contact_number:
//                             req.body.contact_number || user_obj.contact_number,
//                         address: req.body.address || user_obj.address,
//                         user_img: req.body.user_img || user_obj.user_img,
//                         user_id_proof:
//                             req.body.user_id_proof || user_obj.user_id_proof,
//                         having_pet: req.body.having_pet || user_obj.having_pet,
//                         isApproved: req.body.isApproved || user_obj.isApproved,
//                         isActive: 0
//                     },
//                     {
//                         where: {
//                             email: email
//                         }
//                     }
//                 )

//                 Property.create({
//                     // prop_type: req.body.prop_type || user_obj.prop_type,
//                     // prop_address:
//                     //     req.body.prop_address || user_obj.prop_address,
//                     // street_name: req.body.street_name || user_obj.street_name,
//                     // pincode: req.body.pincode || user_obj.pincode,
//                     // landmark: req.body.landmark || user_obj.landmark,
//                     // pro_img: req.body.pro_img || user_obj.pro_img,
//                     // review: req.body.review || user_obj.review,
//                     // photo_req: req.body.photo_req || user_obj.photo_req,
//                     // user_id: req.body.user_id || user_obj.user_id,
//                     // lat: req.body.lat || user_obj.lat,
//                     // lon: req.body.lon || user_obj.lon

//                     prop_type: "bungalow",
//                     prop_address: "test",
//                     street_name: "test",
//                     pincode: "1234",
//                     landmark: "test",
//                     pro_img: "",
//                     review: "test",
//                     photo_req: "",
//                     user_id: 148,
//                     lat: "",
//                     lon: ""
//                 })

//                 Promise.all(
//                     req.body.family.map(async (fam) => {
//                         return Famaly.create({
//                             fam_user_id: req.body.user_id || user_obj.user_id,
//                             member_name:
//                                 fam.member_name || user_obj.member_name,
//                             member_relation:
//                                 fam.member_relation || user_obj.member_relation
//                         })
//                     })
//                 ).then((resData) => {
//                     res.status(200).json({
//                         message: "User Created",
//                         resData
//                     })
//                     console.log("res data =============", resData)
//                 })
//             })

//             // const famData = await Famaly.findAll({
//             //     where: { fam_user_id: req.body.user_id }
//             // })

//             // res.status(200).json({
//             //     message: "User Created",
//             //     famData
//             // })
//         }
//     } catch (err) {
//         console.error(err.message)
//         res.status(500).send("Server Error")
//     }
// }


exports.createProfile = async (req, res) => {
    try {
        let famData = []
        // let propertyData
        const email = req.body.email
        const user = await User.findOne({ where: { email: email } })
        if (!user) {
            return res.status(401).json({
                message: "user not found"
            })
        } else {
            User.findOne({ where: { email: email } }).then((user_obj) => {
                User.update(
                    {
                        famaly_members_count:
                            req.body.famalyMember_count ||
                            user_obj.famaly_members_count,
                        first_name: req.body.first_name || user_obj.first_name,
                        last_name: req.body.last_name || user_obj.last_name,
                        contact_number:
                            req.body.contact_number || user_obj.contact_number,
                        address: req.body.address || user_obj.address,
                        user_img: req.body.user_img || user_obj.user_img,
                        user_id_proof:
                            req.body.user_id_proof || user_obj.user_id_proof,
                        having_pet: req.body.having_pet || user_obj.having_pet,
                        isApproved: req.body.isApproved || user_obj.isApproved,
                        isActive: 0
                    },
                    {
                        where: {
                            email: email
                        }
                    }
                )
                console.log("req body", req.body)

                //  var property= Property.create({
                //         prop_type: req.body.prop_type,
                //         prop_address: req.body.prop_address,
                //         street_name: req.body.street_name,
                //         pincode: req.body.pincode,
                //         landmark: req.body.landmark,
                //         pro_img: req.body.pro_img,
                //         review: req.body.review,
                //         photo_req: req.body.photo_req,
                //         user_id: req.body.user_id,
                //         lat: req.body.lat,
                //         lon: req.body.lon
                //     })

                Promise.all(
                    req.body.family.map(async (fam) => {
                        return Famaly.create({
                            fam_user_id: req.body.user_id || user_obj.user_id,
                            member_name:
                                fam.member_name || user_obj.member_name,
                            member_relation:
                                fam.member_relation || user_obj.member_relation
                        })
                    })
                ).then((resData) => {
                    res.status(200).json({
                        message: "User Created",
                        resData
                    })
                })
            })

            // const famData = await Famaly.findAll({
            //     where: { fam_user_id: req.body.user_id }
            // })

            // res.status(200).json({
            //     message: "User Created",
            //     famData
            // })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}



exports.CreatePropertyRequest = async (req, res) => {
    const image = JSON.stringify(req.body.pro_img)
    console.log("req body = = = = = ", req.body)
    try {
        var property = await Property.create({
            prop_type: req.body.prop_type,
            prop_address: req.body.prop_address,
            street_name: req.body.street_name,
            pincode: req.body.pincode,
            landmark: req.body.landmark,
            pro_img: image,
            review: req.body.review,
            photo_req: req.body.photo_req,
            user_id: req.body.user_id,
            lat: req.body.lat,
            lon: req.body.lon,
            isHosted: req.body.isHosted
        })

        if (!property) {
            return res.status(401).json({
                message: "failed to create new offer"
            })
        }
        else {
            return res.status(200).json({
                message: "create new campaigns",
                property
            })
        }

    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}



// update profile
exports.updateProfile = async (req, res) => {
    console.log("helloooooooooooooooo======", req.body)
    try {
        const id = req.body
        const user = await User.findAll({ where: { id } })
        if (!user) {
            return res.status(401).json({
                message: "user not found"
            })
        } else {
            User.findByPk(req.params.id).then((user) => {
                // console.log(
                //     "User is================================--------------------"
                // )
                // console.log(user)
                User.update(
                    {
                        first_name:
                            req.body.userProfile.first_name || user.first_name,
                        last_name:
                            req.body.userProfile.last_name || user.last_name,
                        address: req.body.userProfile.address || user.address,
                        user_img:
                            req.body.userProfile.user_img || user.user_img,
                        contact_number:
                            req.body.userProfile.contact_number ||
                            user.contact_number,
                        user_id_proof:
                            req.body.userProfile.user_id_proof ||
                            user.user_id_proof,
                        having_pet:
                            req.body.userProfile.having_pet || user.having_pet
                    },
                    {
                        where: {
                            id: req.params.id
                        }
                    }
                )
                    .then((_) => {
                        res.status(200).send({
                            message: "User updated"
                        })
                    })
                    .catch((err) => res.status(400).send(err))
            })
            Property.findByPk(req.body.propertyData.id)
                .then((property) => {
                    console.log("@22222222222222")
                    Property.update(
                        {
                            landmark:
                                req.body.propertyData.landmark ||
                                property.landmark,
                            prop_type:
                                req.body.propertyData.prop_type ||
                                property.prop_type,
                            prop_address:
                                req.body.propertyData.prop_address ||
                                property.prop_address,
                            street_name:
                                req.body.propertyData.street_name ||
                                property.street_name,
                            pincode:
                                req.body.propertyData.pincode ||
                                property.pincode
                        },
                        {
                            where: {
                                id: req.body.propertyData.id
                            }
                        }
                    )
                })
                .then((_) => {
                    // res.status(200)
                    //     .send({
                    //         message: "Property updated"
                    //     })
                    //     .catch((err) => res.status(400).send(err))
                })
                .catch((err) => {
                    res.status(400).send(err)
                })

            req.body.familyData.family.map(async (data) => {
                console.log(
                    "Family-------------------------------------------",
                    req.body.familyData
                )
                await Famaly.findByPk(data.id)
                console.log(
                    "FamilyInside-------------------------------------------"
                )
                // console.log(data)
                Famaly.update(
                    {
                        member_name: data.member_name || user.member_name,
                        member_relation:
                            data.member_relation || user.member_relation
                    },
                    {
                        where: {
                            id: data.id
                        }
                    }
                )
                //     ).then((_) => {
                //         // res.status(200).send({
                //         //     message: "User updated"
                //         // })
                //     })
                //     // .catch((err) => res.status(400).send(err))
                // })
                // .catch((err) => {
                //     // res.status(400).send(err)
                // })
            })
            req.body.familyData.moreFamilyMembers.map(async (data) => {
                // console.log(
                //     "Family-------------------------------------------",
                //     req.body.familyData
                // )
                // await Famaly.findByPk(data.id)
                // console.log(
                //     "FamilyInside-------------------------------------------"
                // )
                // console.log(data)
                Famaly.create(
                    {
                        fam_user_id: req.body.userProfile.id,
                        member_name: data.member_name || user.member_name,
                        member_relation:
                            data.member_relation || user.member_relation
                    }
                    // {
                    //     where: {
                    //         id: data.id
                    //     }
                    // }
                )
                //     ).then((_) => {
                //         // res.status(200).send({
                //         //     message: "User updated"
                //         // })
                //     })
                //     // .catch((err) => res.status(400).send(err))
                // })
                // .catch((err) => {
                //     // res.status(400).send(err)
                // })
            })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

exports.getIsVerified = async (req, res) => {
    try {
        const userProfile = await User.findOne({
            where: {
                id: req.body.userId
            }
        })
        res.status(200).json(userProfile)
    } catch (err) {
        res.status(500).json(err)
    }
}

// update profile
exports.getUserProfile = async (req, res) => {
    try {
        const userProfile = await User.findOne({
            where: {
                id: req.body.userId
            }
        })

        const propertyData = await Property.findOne({
            where: {
                user_id: req.body.userId
            }
        })

        const familyData = await Famaly.findAll({
            where: {
                fam_user_id: req.body.userId
            }
        })

        res.json({
            userProfile: userProfile,
            propertyData: propertyData,
            familyData: familyData
        })
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

exports.changePassword = async (req, res) => {
    try {
        console.log("================================== changed")
        const user = await User.findOne({
            where: {
                id: req.body.id
            }
        })
        if (user) {
            const confirmPassword = await bcrypt.compare(
                req.body.currentPassword,
                user.password
            )
            if (confirmPassword) {
                const password = await bcrypt.hash(req.body.newPassword, 10)
                await User.update(
                    {
                        password: password
                    },
                    {
                        where: {
                            id: req.body.id
                        }
                    }
                )
                return res.status(200).json("password changed successfully")
            } else {
                res.status(400).json("Password didnt matched")
            }
        } else {
            res.status(400).json("No user found")
        }
    } catch (err) {
        return res.status(400).json(err)
    }
}

exports.forgotPassword = async (req, res) => {
    try {
        console.log("boody----------", req.body)
        if (req.body.email == "") {
            res.status(400).send("Email required")
        }

        User.findOne({
            where: {
                email: req.body.email
            }
        }).then((user) => {
            // console.log("User--------------",user)
            if (user == null) {
                console.log("Email not in db")
                res.status(403).send("Email not in db")
            } else {
                const token = crypto.randomBytes(20).toString("hex")
                console.log("token--------------", token)
                user.update({
                    resetPasswordToken: token,
                    resetPasswordExpires: Date.now() + 3600000
                })

                const transporter = mailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: "prathamesh.malondkar@aasa.tech",
                        pass: "fiuvaqxkqzuobcfg"
                    }
                })

                const mailOptions = {
                    from: "prathamesh.malondkar@aasa.tech",
                    to: req.body.email,
                    subject: "Link to reset password.",
                    text:
                        `You are receiving this because you (or someone else) have requested the reset of the password for your account. \n\n` +
                        `Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it: \n\n` +
                        `http://localhost:3000/reset/${token}\n\n` +
                        `If you did not request this, please ignore this email and your password will remain unchanged.\n`
                }

                console.log("Sending email-------------")

                transporter.sendMail(mailOptions, function (err, response) {
                    if (err) {
                        console.log("There was an error: ", err)
                        return res.status(400).json("There was an error: ", err)
                    } else {
                        console.log("Here is the res: ", response)
                        return res.status(200).json("Recovery mail sent")
                    }
                })
            }
        })
    } catch (err) {
        console.log("ERROOR-------------", err)
        return res.status(400).json(err)
    }
}

exports.resetPasswordData = async (req, res) => {
    console.log(
        "resetPasswordData calld------------",
        req.query.resetPasswordToken
    )
    User.findOne({
        where: {
            resetPasswordToken: req.query.resetPasswordToken
            // resetPasswordExpires: {
            //     $gt: Date.now(),
            // },
        }
    }).then((user) => {
        if (user == null) {
            console.log("Link expired or invalid")
            return res.json("Password reset link is invalid or expired.")
        } else {
            return res.json({
                email: user.email,
                message: "password reset link a-ok"
            })
        }
    })
}

exports.updatePasswordViaEmail = async (req, res) => {
    console.log("updatePasswordViaEmail calld------------", req.body)
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then((user) => {
        if (user !== null) {
            console.log("User exists!")
            bcrypt
                .hash(req.body.password, 10)
                .then((hashedPassword) => {
                    user.update({
                        password: hashedPassword,
                        resetPasswordToken: null,
                        resetPasswordExpires: null
                    })
                })
                .then(() => {
                    console.log("Password Updated")
                    return res.json({
                        message: "Password updated"
                    })
                })
        } else {
            console.log("No user exists")
            return res.json({
                message: "No user exists in db to update"
            })
        }
    })
}
// get user id by month

exports.getUserMonth = async (req, res) => {
    try {
        const id = req.body
        const users = await User.findAll({
            // attributes: [[ sequelize.fn('count', sequelize.col('id')), 'data']],
            // group: [sequelize.fn('date_trunc', 'day', sequelize.col('createdAt'))]
            attributes: [
                [sequelize.fn("MONTH", sequelize.col("createdAt")), "month"],
                [sequelize.fn("count", sequelize.col("id")), "data"]
            ],
            group: [sequelize.fn("MONTH", sequelize.col("createdAt")), "month"]
        })
        if (!users) {
            return res.status(400).json({
                msg: "There is no profile for this user"
            })
        }
        res.json(users)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

exports.contactEmail = (req, res) => {
    try {
        var smtpProtocol = mailer.createTransport({
            service: "Gmail",
            auth: {
                user: "prathamesh.malondkar@aasa.tech",
                pass: "fiuvaqxkqzuobcfg"
            }
        })
        var mailoption = {
            from: "prathamesh.malondkar@aasa.tech",
            to: "ninad.muranjan@aasa.tech",
            subject: req.body.emailTitle,
            html: req.body.emailBody
        }
        console.log("=======================")
        smtpProtocol.sendMail(mailoption, function (err, response) {
            if (err) {
                console.log(err)
            }
            smtpProtocol.close()
        })

        return res.status(200).json({
            message: "Mail Sent"
            // response
        })
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

exports.removeFamilyMembers = (req, res) => {
    console.log("3333333333333333333333333333333333333")
    try {
        Famaly.destroy({
            where: {
                id: req.body.id
            }
        })
            .then(() => {
                res.status(200).json("Successfully Deleted")
            })
            .catch((err) => console.log(err))
    } catch (err) {
        res.status(500).json(err)
    }
}
