const { Setting } = require("../models")
const model = require("../models")

//CREATESETTING

exports.createSettings = async (req, res) => {
    try {
        const setting = await Setting.create({
            user_id: req.body.userId,
            guest_req_notifi: 1,
            review_rating_notifi: 1,
            guest_review_notifi_email: 1,
            review_rating_notification_email: 1
        })
        return res.status(200).json("Created")
    } catch (err) {
        return res.status(500).json(err)
    }
}

// gest request notification
exports.GuestRequestNotification = async (req, res) => {
    try {
        const { guest_req_notifi } = req.body
        var guestreqnotifi = await Setting.create({
            guest_req_notifi
        })
        if (!guestreqnotifi) {
            return res.status(401).json({
                message: "is failed"
            })
        } else {
            return res.status(200).json({
                message: "approve"
            })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

// review rating notification
exports.reviewRatingNotification = async (req, res) => {
    try {
        const { review_rating_notifi } = req.body
        var reviewratingnotifi = await Setting.create({
            review_rating_notifi
        })
        if (!reviewratingnotifi) {
            return res.status(401).json({
                message: "failed "
            })
        } else {
            return res.status(200).json({
                message: "approve"
            })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

// guest review notification email
exports.guestReviewNotificationEmail = async (req, res) => {
    try {
        const { guest_review_notifi_email } = req.body
        var guestreviewnotifiemail = await Setting.create({
            guest_review_notifi_email
        })
        if (!guestreviewnotifiemail) {
            return res.status(401).json({
                message: "failed "
            })
        } else {
            return res.status(200).json({
                message: "approve"
            })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

// review rating notification email
exports.reviewRatingNotificationEmail = async (req, res) => {
    try {
        const { review_rating_notification_email } = req.body
        var reviewratingnotificationemail = await Setting.create({
            review_rating_notification_email
        })
        if (!reviewratingnotificationemail) {
            return res.status(401).json({
                message: "failed "
            })
        } else {
            return res.status(200).json({
                message: "approve"
            })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

// get all notification--------------------------------------------------------

exports.getAllNotification = async (req, res) => {
    try {
        const id = req.body
        const users = await Setting.findAll({
            where: { user_id: req.body.user_id }
        })
        if (!users) {
            return res.status(400).json({
                msg: "There is no notification pending"
            })
        }
        res.json(users)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

//update isGuestRequest
exports.isGuestRequest = async (req, res) => {
    try {
        console.log("body id  is ---------------->", req.body.user_id)
        Setting.findByPk(req.body.user_id).then((prop) => {
            Setting.update(
                {
                    guest_req_notifi: req.body.guest_req_notifi
                },
                {
                    where: {
                        user_id: req.body.user_id
                    }
                }
            )
                .then((_) => {
                    res.status(200).send({
                        message: "isGuestRequest updated"
                    })
                })
                .catch((err) => res.status(400).send(err))
        })
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

//review_rating_notifi

exports.isreviewratingnotifi = async (req, res) => {
    try {
        console.log("body id  is ---------------->", req.body.user_id)
        Setting.findByPk(req.body.user_id).then((prop) => {
            Setting.update(
                {
                    review_rating_notifi: req.body.review_rating_notifi
                },
                {
                    where: {
                        user_id: req.body.user_id
                    }
                }
            )
                .then((_) => {
                    res.status(200).send({
                        message: "isreviewrating updated"
                    })
                })
                .catch((err) => res.status(400).send(err))
        })
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

//	guest_review_notifi_email

exports.guestreviewnotifiemail = async (req, res) => {
    try {
        console.log("body id  is ---------------->", req.body.user_id)
        Setting.findByPk(req.body.user_id).then((prop) => {
            Setting.update(
                {
                    guest_review_notifi_email:
                        req.body.guest_review_notifi_email
                },
                {
                    where: {
                        user_id: req.body.user_id
                    }
                }
            )
                .then((_) => {
                    res.status(200).send({
                        message:
                            "guest_review_notifi_emailisreviewrating updated"
                    })
                })
                .catch((err) => res.status(400).send(err))
        })
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

// review_rating_notification_email

exports.reviewratingnotificationemail = async (req, res) => {
    try {
        console.log("body id  is ---------------->", req.body.user_id)
        Setting.findByPk(req.body.user_id).then((prop) => {
            Setting.update(
                {
                    review_rating_notification_email:
                        req.body.review_rating_notification_email
                },
                {
                    where: {
                        user_id: req.body.user_id
                    }
                }
            )
                .then((_) => {
                    res.status(200).send({
                        message: "review_rating_notification_email updated"
                    })
                })
                .catch((err) => res.status(400).send(err))
        })
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}
