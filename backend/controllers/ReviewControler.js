const { Review, Booking, Property, Notification } = require("../models")
const model = require("../models")
var cron = require("node-cron")
var moment = require("moment")
const { Op } = require("sequelize")
const mailer = require("nodemailer")
// const Notification = require("../models/Notification")

exports.postReview = async (req, res) => {
    try {
        const { prop_user_id, rev_property_id, comment, review } = req.body
        var post_review = await Review.create({
            prop_user_id,
            rev_property_id,
            comment,
            review
        })
        if (!post_review) {
            return res.status(401).json({
                message: "is failed"
            })
        } else {
            return res.status(200).json({
                message: "approve",
                post_review
            })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

exports.getApproveAllReview = async (req, res) => {
    try {
        var get_all_review = await Review.findAll({
            where: {
                isApproveReview: true
            },
            attributes: [
                "prop_user_id",
                "rev_property_id",
                "comment",
                "review",
                "isApproveReview"
            ],
            subQuery: false,
            include: [
                {
                    model: model.User,
                    as: "users",
                    subQuery: false,
                    attributes: ["first_name", "last_name", "user_img"]
                }
            ]
        })
        if (!get_all_review) {
            return res.status(401).json({
                message: "is failed"
            })
        } else {
            return res.status(200).json({
                message: "approve",
                get_all_review
            })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

exports.getAllReview = async (req, res) => {
    try {
        var get_all_review = await Review.findAll({
            attributes: [
                "id",
                "prop_user_id",
                "rev_property_id",
                "comment",
                "review",
                "isApproveReview"
            ],
            subQuery: false,
            include: [
                {
                    model: model.User,
                    as: "users",
                    subQuery: false,
                    attributes: ["first_name", "last_name", "user_img"]
                }
            ]
        })
        if (!get_all_review) {
            return res.status(401).json({
                message: "is failed"
            })
        } else {
            return res.status(200).json({
                message: "approve",
                get_all_review
            })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

exports.DeleteReview = async (req, res) => {
    try {
        Review.findByPk(req.params.id)
            .then((review) => {
                if (review) {
                    Review.destroy({
                        where: {
                            id: req.params.id
                        }
                    }).then((_) => {
                        res.status(200).send({
                            message: "review Deleted",
                            review
                        })
                    })
                }
            })
            .catch((err) => res.status(400).send(err))
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

exports.isApproveReview = async (req, res) => {
    try {
        console.log("is approved-------", req)
        Review.findByPk(req.body.id)
            .then((isApprove) => {
                Review.update(
                    {
                        isApproveReview: req.body.isApproveReview
                        // isApprove.isApproveReview
                    },
                    {
                        where: {
                            id: req.body.id
                        }
                    }
                ).then((_) => {
                    res.status(200).send({
                        message: "property updated",
                        isApprove
                    })
                })
            })
            .catch((err) => res.status(400).send(err))
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

exports.getReviewsByUserId = async (req, res) => {
    try {
        var get_all_review = await Review.findAll({
            where: {
                prop_user_id: req.params.id,
                isApproveReview: true
            },
            attributes: [
                "id",
                "prop_user_id",
                "rev_property_id",
                "comment",
                "review",
                "isApproveReview",
                "createdAt"
            ],
            subQuery: false,
            include: [
                {
                    model: model.User,
                    as: "users",
                    subQuery: false,
                    attributes: ["first_name", "last_name", "user_img"]
                },
                {
                    model: model.Property,
                    as: "propId",
                    subQuery: false,
                    attributes: [
                        "prop_address",
                        "prop_type",
                        "prop_address",
                        "street_name",
                        "pincode",
                        "landmark",
                        "pro_img",
                        "review",
                        "photo_req"
                    ],
                    include: [
                        {
                            model: model.User,
                            as: "users",
                            subQuery: false,
                            attributes: [
                                "first_name",
                                "last_name",
                                "address",
                                "user_img",
                                "contact_number",
                                "user_id_proof",
                                "having_pet",
                                "password",
                                "email",
                                "isApproved",
                                "isActive",
                                "createdAt",
                                "updatedAt"
                            ]
                        }
                    ]
                }
            ]
        })
        if (!get_all_review) {
            return res.status(401).json({
                message: "is failed"
            })
        } else {
            return res.status(200).json({
                message: "Success",
                get_all_review
            })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

exports.sendReviewNotifications = async (req, res) => {
    try {
        // let yourDate = new Date()
        // let formatedDate = yourDate.toISOString().split('T')[0]

        // var d = new Date();
        // await d.setHours(0,0,0,0);

        const TODAY_START = new Date().setHours(0, 0, 0, 0)
        const NOW = new Date()

        console.log("TODAY_START-------------", TODAY_START)
        console.log("NOW-------------", NOW)
        var getStaysEndingToday = await Booking.findAll({
            where: {
                end_date: {
                    [Op.gt]: TODAY_START,
                    [Op.lt]: NOW
                }
            },
            include: [
                {
                    model: model.User,
                    as: "users",
                    subQuery: false,
                    attributes: [
                        "first_name",
                        "last_name",
                        "address",
                        "user_img",
                        "contact_number",
                        "user_id_proof",
                        "having_pet",
                        "famaly_members_count",
                        "fam_members_F_name",
                        "fam_members_L_name",
                        "relation",
                        "password",
                        "email",
                        "isApproved",
                        "isActive",
                        "createdAt",
                        "updatedAt"
                    ]
                },
                {
                    model: model.Property,
                    as: "propId",
                    subQuery: false,
                    attributes: [
                        "id",
                        "prop_address",
                        "prop_type",
                        "prop_address",
                        "street_name",
                        "pincode",
                        "landmark",
                        "pro_img",
                        "review",
                        "photo_req"
                    ],
                    include: [
                        {
                            model: model.User,
                            as: "users",
                            subQuery: false,
                            attributes: [
                                "id",
                                "first_name",
                                "last_name",
                                "address",
                                "user_img",
                                "contact_number",
                                "user_id_proof",
                                "having_pet",
                                "famaly_members_count",
                                "fam_members_F_name",
                                "fam_members_L_name",
                                "relation",
                                "password",
                                "email",
                                "isApproved",
                                "isActive",
                                "createdAt",
                                "updatedAt"
                            ]
                        }
                    ]
                }
            ]
        })
        // console.log("===================", getStaysEndingToday)

        getStaysEndingToday.map(async (stay) => {
            const guestNotification = {
                userId: stay.booking_user_id,
                property_id: stay.propId.id,
                review_userid: stay.propId.users.id,
                title: "Stay Review",
                desc: "Please review your stay at " + stay.propId.prop_address,
                notification_type: 0
            }

            const ownerNotification = {
                userId: stay.propId.users.id,
                property_id: stay.propId.id,
                review_userid: stay.booking_user_id,
                title: "User Review",
                desc:
                    "Please review " +
                    stay.users.first_name +
                    " " +
                    stay.users.last_name,
                notification_type: 0
            }

            await createNotification(guestNotification)
            await createNotification(ownerNotification)
        })

        if (!getStaysEndingToday) {
            return res.status(401).json({
                message: "is failed"
            })
        } else {
            return res.status(200).json({
                message: "Successsss",
                getStaysEndingToday
            })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

exports.sendMail = async (req, res) => {
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
            to: "malondkarprathamesh@gmail.com",
            subject: "Test Mail",
            html: "<h1>Good Morning!</h1>"
        }

        smtpProtocol.sendMail(mailoption, function (err, response) {
            if (err) {
                console.log(err)
            }
            smtpProtocol.close()
            return res.status(200).json({
                message: "Mail Sent",
                response
            })
        })
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

// cron.schedule('1,2,4,5 * * * *', () => {
//   console.log('running every minute 1, 2, 4 and 5');
// });

const createNotification = async (notification) => {
    // getStaysEndingToday.map(async (stay) => {
    try {
        const guestNotification = await Notification.create(notification)
    } catch (err) {
        console.log(err)
    }
    // })
}
