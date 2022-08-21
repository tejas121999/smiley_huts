const { Campaigns } = require("../models")
const model = require("../models")

// create campaigns
exports.createCampaigns = async (req, res) => {
    try {
        const {
            user_id,
            write_email,
            recipients,
            isScheduled,
            delivery_date,
            open_count,
            schedule_by,
            campaigns_title,
            createdAt
        } = req.body
        var createCamp = await Campaigns.create({
            user_id,
            write_email,
            recipients,
            isScheduled,
            delivery_date,
            open_count,
            schedule_by,
            campaigns_title,
            createdAt
        })
        if (!createCamp) {
            return res.status(401).json({
                message: "failed to create new campaigns"
            })
        } else {
            return res.status(200).json({
                message: "create new campaigns",
                createCamp
            })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

// delete schedule campaigns
exports.deleteScheduleCamp = async (req, res) => {
    try {
        var scheduleCamp = await Campaigns.findByPk(req.params.id)
        if (!scheduleCamp) {
            return res.status(401).json({
                message: "camp not found"
            })
        } else {
            Campaigns.findByPk(req.params.id)
                .then((camp) => {
                    if (camp) {
                        Campaigns.destroy({
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
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

// get all schedule campaigns
exports.getscheduledCamp = async (req, res) => {
    try {
        var getScheduleCamp = await Campaigns.findAll({
            attributes: [
                "id",
                "user_id",
                "write_email",
                "recipients",
                "isScheduled",
                "delivery_date",
                "open_count",
                "schedule_by",
                "campaigns_title",
                "createdAt",
                "updatedAt"
            ],
            subQuery: false,
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
        })
        if (!getScheduleCamp) {
            return res.status(401).json({
                message: "Failed to get a camp"
            })
        } else {
            return res.status(200).json({
                message: "property created successfully",
                getScheduleCamp
            })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

// reschedule campaigns
exports.RescheduleCamp = async (req, res) => {
    try {
        Campaigns.findByPk(req.params.id).then((d_date) => {
            Campaigns.update(
                {
                    delivery_date:
                        req.body.delivery_date || d_date.delivery_date
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
                        d_date
                    })
                })
                .catch((err) => res.status(400).send(err))
        })
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

// get all camaigns Draft
exports.getAllCampaignsDraft = async (req, res) => {
    try {
        var getScheduleCamp = await Campaigns.findAll({
            where: {
                isDraft: true
            },
            attributes: [
                "id",
                "user_id",
                "write_email",
                "recipients",
                "isScheduled",
                "delivery_date",
                "open_count",
                "schedule_by",
                "campaigns_title",
                "createdAt",
                "updatedAt"
            ],
            subQuery: false,
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
        })
        if (!getScheduleCamp) {
            return res.status(401).json({
                message: "Failed to get a camp"
            })
        } else {
            return res.status(200).json({
                message: "property created successfully",
                getScheduleCamp
            })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

// update campaigns draft
exports.updateCampaignsDraft = async (req, res) => {
    try {
        Campaigns.findByPk(req.params.id).then((draft) => {
            Campaigns.update(
                {
                    user_id: req.body.user_id || draft.user_id,
                    write_email: req.body.write_email || draft.write_email,
                    recipients: req.body.recipients || draft.recipients,
                    isScheduled: req.body.isScheduled || draft.isScheduled,
                    open_count: req.body.open_count || draft.open_count,
                    schedule_by: req.body.schedule_by || draft.schedule_by,
                    campaigns_title:
                        req.body.campaigns_title || draft.campaigns_title,
                    delivery_date: req.body.delivery_date || draft.delivery_date
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
                        draft
                    })
                })
                .catch((err) => res.status(400).send(err))
        })
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

// delete campaigns draft
exports.deleteCampaignsDraft = async (req, res) => {
    try {
        var scheduleCamp = await Campaigns.findByPk(req.params.id)
        if (!scheduleCamp) {
            return res.status(401).json({
                message: "camp not found"
            })
        } else {
            Campaigns.findByPk(req.params.id)
                .then((camp) => {
                    if (camp) {
                        Campaigns.destroy({
                            where: {
                                id: req.params.id
                            }
                        }).then((_) => {
                            res.status(200).send({
                                message: "Camp Deleted",
                                camp
                            })
                        })
                    }
                })
                .catch((err) => res.status(400).send(err))
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

//get all previous campaigns
exports.PreviousCamp = async (req, res) => {
    try {
        res.send("Previous campaigns")
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

// duplicate previous campaigns draft
exports.duplicateCampDraft = async (req, res) => {
    try {
        res.send("Previous campaigns")
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

exports.scheduleCampaign = async (req, res) => {
    try {
        var smtpProtocol = mailer.createTransport({
            service: "Gmail",
            auth: {
                user: "prathamesh.malondkar@aasa.tech",
                pass: "fiuvaqxkqzuobcfg"
            }
        })

        req.body.users.map((user) => {
            var mailoption = {
                from: "prathamesh.malondkar@aasa.tech",
                to: user.email,
                subject: req.body.emailTitle,
                html: req.body.longDesc
            }

            smtpProtocol.sendMail(mailoption, function (err, response) {
                if (err) {
                    console.log(err)
                }
                smtpProtocol.close()
            })
        })
        return res.status(200).json({
            message: "Mail Sent",
            response
        })
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

//GET ACTIVE USERS
