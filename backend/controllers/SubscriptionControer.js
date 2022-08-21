const { Subscription, User, Payment } = require("../models")
var moment = require("moment")
const model = require('../models');
const { Sequelize } = require("sequelize")
exports.CreatePlane = async (req, res) => {
    try {
        const { subscription, value } = req.body
        var create_plane = await Subscription.create({
            price: subscription["price"],
            description: subscription['description'],
            select_sub_month: subscription['select_sub_month'],
            isSubscription: req.body.value
        })
        console.log("create_plane", req.body.value)
        if (!create_plane) {
            return res.status(401).json({
                message: "is failed"
            })
        } else {
            return res.status(200).json({
                message: "approve",
                create_plane
            })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

exports.updatePlane = async (req, res) => {
    console.log(req.body)
    try {
        Subscription.findByPk(req.params.id).then((prop) => {
            Subscription.update(
                {
                    price: req.body.price || prop.price,
                    description: req.body.description || prop.description,
                    select_sub_month: req.body.select_sub_month || prop.select_sub_month,
                    isSubscription: req.body.isSubscription || prop.isSubscription
                },
                {
                    where: {
                        id: req.params.id
                    }
                }

            )
                .then((_) => {
                    res.status(200).send({
                        message: "property updated",
                        prop
                    })
                })
                .catch((err) => res.status(400).send(err))
        })
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

exports.viewPlane = async (req, res) => {
    try {
        var view_plane = await Subscription.findAll()
        if (!view_plane) {
            return res.status(401).json({
                message: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                message: "Subscriptions",
                view_plane
            })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}



exports.deletePlane = async (req, res) => {
    try {
        Subscription.findByPk(req.params.id)
            .then((camp) => {
                if (camp) {
                    Subscription.destroy({
                        where: {
                            id: req.params.id
                        }
                    }).then((_) => {
                        res.status(200).send({
                            message: "Camp Deleted"
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

exports.getSubDataById = async (req, res) => {
    try {
        var data = await Subscription.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                "price",
                "select_sub_month"
            ]
        })
        if (data) {
            res.status(200).json({ data })
        } else {
            res.status(400).json("Data Not Found")
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

exports.getPlanByUserID = async (req, res) => {
    try {
        var date = await User.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                "id",
                "subscription_start_date",
                "subscription_end_date",
                "sub_amount",
                "sub_duration"
            ],
            subQuery: false,
        })

        var price = await Payment.findOne({
            where: {
                user_id: req.params.id
            },
            attributes: [
                "amount"
            ],

        })


        if (price && date) {
            res.status(200).json({ price, date })
        } else {
            res.status(400).json("user not found")
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

exports.checkUserSubscribe = async (req, res) => {
    try {
        var price = await Payment.findOne({
            where: {
                user_id: req.params.user_id
            }
        })
        if (price) {
            res.status(200).json("user was already taking subscription")
        } else {
            res.status(400).json("user wasn't get subscription yet")
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

exports.updateSubscriptionDate = async (req, res) => {
    console.log("res == = = = = = = = = =", res.body)
    try {
        User.findByPk(req.params.id).then((data) => {
            User.update(
                {
                    sub_amount: req.body.sub_amount || data.sub_amount,
                    sub_duration: req.body.sub_duration || data.sub_duration,
                    subscription_start_date: req.body.subscription_start_date || data.subscription_start_date,
                    subscription_end_date: req.body.subscription_end_date || data.subscription_end_date
                },
                {
                    where: {
                        id: req.params.id
                    }
                }
            )
                .then((_) => {
                    console.log(data)
                    res.status(200).send({
                        message: "date update",
                        data
                    })
                })
        })
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

//  Get user subscription
exports.getSubscriptionById = async (req, res) => {
    // console.log("Req--------------",req.body);
    try {
        var user_subs = await Subscription.findOne({
            where: {
                id: req.body.subId
            }
        })

        var user_data = await User.findOne({
            where: {
                id: req.body.userId
            }
        })

        if (!user_subs) {
            return res.status(401).json({
                message: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                message: "success",
                user_subs,
                user_data
            })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

// On sub complete
exports.onSubscriptionComplete = async (req, res) => {
    try {
        const {
            user_id,
            order_id,
            payer_id,
            facilitator_access_token,
            payment_source,
            payment_method,
            amount,
            isActive,
            // subscription_id
        } = req.body

        var payment = await Payment.create({
            user_id,
            order_id,
            payer_id,
            facilitator_access_token,
            payment_source,
            payment_method,
            amount,
            // subscription_id
        })

        if (!payment) {
            return res.status(401).json({
                message: "Payment Failed"
            })
        } else {
            var end_date = new Date() // Now
            end_date.setDate(end_date.getDate() + 30)
            var user_update = await User.findByPk(req.params.id).then(
                (user) => {
                    User.update(
                        {
                            isActive: isActive,
                            subscription_start_date: new Date(),
                            subscription_end_date: end_date
                        },
                        {
                            where: {
                                id: user_id
                            }
                        }
                    )
                }
            )

            return res.status(200).json({
                message: "Payment Successful",
                payment
            })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

// On re-sub complete
exports.onReSubscriptionComplete = async (req, res) => {
    try {
        const {
            user_id,
            order_id,
            payer_id,
            facilitator_access_token,
            payment_source,
            payment_method,
            amount,
            newEndDate,
            newStartDate,
            subscription_id
        } = req.body

        var payment = await Payment.create({
            user_id,
            order_id,
            payer_id,
            facilitator_access_token,
            payment_source,
            payment_method,
            amount,
            subscription_id
        })

        if (!payment) {
            return res.status(401).json({
                message: "Payment Failed"
            })
        } else {
            var user_update = await User.findByPk(req.body.user_id).then(
                async (user) => {
                    await User.update(
                        {
                            isActive: 1,
                            subscription_start_date: newStartDate,
                            subscription_end_date: newEndDate
                        },
                        {
                            where: {
                                id: user_id
                            }
                        }
                    )
                }
            )

            return res.status(200).json({
                message: "Payment Successful",
                payment
            })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

//sum of payment
exports.payementSum = async (req, res) => {
    try {
        var payementSum = await Payment.findAll({
            attributes: [
                [Sequelize.fn("sum", Sequelize.col("amount")), "total_amount"]
            ]
        })
        if (!payementSum) {
            return res.status(400).json({
                msg: "There is no amount"
            })
        }
        // console.log("payment------------->",payementSum)
        // res.json("payementSum");
        return res.status(200).json({
            message: "Payment Successful",
            payementSum
        })
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

exports.getSubscription = async (req, res) => {
    try {
        const id = req.body
        const payment = await Payment.findAll({
            // attributes: [[ sequelize.fn('count', sequelize.col('id')), 'data']],
            // group: [sequelize.fn('date_trunc', 'day', sequelize.col('createdAt'))]
            attributes: [
                [Sequelize.fn("MONTH", Sequelize.col("createdAt")), "month"],
                [Sequelize.fn("count", Sequelize.col("id")), "payment"]
            ],
            group: [Sequelize.fn("MONTH", Sequelize.col("createdAt")), "month"]
        })
        if (!payment) {
            return res.status(400).json({
                msg: "There is no payament"
            })
        }
        res.json(payment)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}
