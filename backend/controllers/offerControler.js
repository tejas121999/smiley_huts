const { Offer, User } = require("../models")
const model = require("../models")


// create offer
exports.CreateOffer = async (req, res) => {
    try {
        const {
            offer_user_id,
            offers_name,
            offer_desc,
            offer_terms,
            isOffer,
            isMember
        } = req.body
        var createOffer = await Offer.create({
            offer_user_id,
            offers_name,
            offer_desc,
            offer_terms,
            isOffer,
            isMember
        })
        if (!createOffer) {
            return res.status(401).json({
                message: "failed to create new offer"
            })
        } else {
            return res.status(200).json({
                message: "create new campaigns",
                createOffer
            })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

exports.EditOffer = async (req, res) => {
    try {
        Offer.findByPk(req.params.id).then((offers) => {
            Offer.update({
                offer_user_id: req.body.offer_user_id || offers.offer_user_id,
                offers_name: req.body.offers_name || offers.offers_name,
                offer_desc: req.body.offer_desc || offers.offer_desc,
                offer_terms: req.body.offer_terms || offers.offer_terms,
                isOffer: req.body.isOffer || offers.isOffer,
                isMember: req.body.isMember || offers.isMember
            },
                {
                    where: {
                        id: req.params.id
                    }
                }
            )
                .then((_) => {
                    res.status(200).send({
                        message: "offer updated",
                        offers
                    })
                })
                .catch((err) => res.status(400).send(err))
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
}

exports.DeleteOffer = async (req, res) => {
    try {
        const offers = await Offer.findByPk(req.params.id)
        if (!offers) {
            return res.status(401).json({
                message: "offer not found"
            })
        } else {
            Offer.findByPk(req.params.id)
                .then((offers_data) => {
                    if (offers_data) {
                        Offer.destroy({
                            where: {
                                id: req.params.id
                            }
                        }).then((_) => {
                            res.status(200).send({
                                message: "Offer Deleted",
                                offers_data
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

exports.GetAllOffer = async (req, res) => {
    try {
        const getallOffer = await Offer.findAll()
        if (!getallOffer) {
            return res.status(400).json({
                msg: "There is no offers are available"
            })
        }
        res.json(getallOffer)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

exports.GetEnabledOffer = async (req, res) => {
    try {
        var getEnableOffer = await Offer.findAll({
            where: {
                isOffer: true
            },
            attributes: [
                "offer_user_id",
                "offers_name",
                "offer_desc",
                "offer_terms",
                "isOffer",
                "isMember"
            ],
            subQuery: false,
        })
        if (!getEnableOffer) {
            return res.status(401).json({
                message: "Failed to get a offer"
            })
        } else {
            return res.status(200).json({
                message: "property created successfully",
                getEnableOffer
            })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

exports.GetDisableOffer = async () => {
    try {
        var getEnableOffer = await Offer.findAll({
            where: {
                isOffer: false
            },
            attributes: [
                "offer_user_id",
                "offers_name",
                "offer_desc",
                "offer_terms",
                "isOffer",
                "isMember"
            ],
            subQuery: false,
        })
        if (!getEnableOffer) {
            return res.status(401).json({
                message: "Failed to get a offer"
            })
        } else {
            return res.status(200).json({
                message: "property created successfully",
                getEnableOffer
            })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}