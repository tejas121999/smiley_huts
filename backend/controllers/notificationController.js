const { Notification } = require("../models")
const { Op } = require("sequelize")

exports.getnotificationbyueseID = async (req, res) => {
    try {
        // const userData = await Booking.findByPk(req.params.id)
        const userReview = await Notification.findAll({
            where: {
                userId: req.params.id
            }
        })
        if (!userReview) {
            return res.status(401).json({
                message: "is failed"
            })
        } else {
            return res.status(200).json({
                message: "Reservation Data",
                userReview
            })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}
exports.getUnreadNotificationCount = async (req, res) => {
    try {
        // const userData = await Booking.findByPk(req.params.id)
        const userReview = await Notification.findAll({
            where: {
                [Op.and]: [
                    {
                        userId: req.params.id
                    },
                    {
                        read_unread: 0
                    }
                ]
            }
        })
        if (!userReview) {
            return res.status(401).json({
                message: "is failed"
            })
        } else {
            return res.status(200).json({
                message: "Reservation Data",
                userReview
            })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

exports.addNotification = async (req, res) => {
    // console.log("Test1---------")
    try {
        const { userId, title, desc } = req.body
        // const user_id = req.params.User_id
        var CreateNotification = await Notification.create({
            userId,
            title,
            desc
        })
        if (!CreateNotification) {
            return res.status(401).json({
                message: "Failed to create a Notification"
            })
        } else {
            return res.status(200).json({
                message: "Notification created successfully"
            })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}
exports.updateNotification = async (req, res) => {
    // console.log("Test1---------")
    try {
        const { title, desc, read_unread } = req.body
        // const user_id = req.params.User_id
        const notification = await Notification.findByPk(req.params.id)
        // console.log("=======", read_unread)

        Notification.update(
            {
                // title,
                // desc,
                read_unread
            },
            {
                where: {
                    id: req.params.id
                }
            }
        )

        if (!notification) {
            return res.status(401).json({
                message: "Failed to update Notification"
            })
        } else {
            return res.status(200).json({
                message: "Notification updated successfully"
            })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}
