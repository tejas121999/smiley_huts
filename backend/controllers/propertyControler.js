const {
    Property,
    Review,
    Booking,
    User,
    NewPropertyImages
} = require("../models")
const model = require("../models")
const { QueryTypes, Sequelize, Op } = require("sequelize")
const env = process.env.NODE_ENV || "development"
const config = require(__dirname + "/../config/config.json")[env]

let sequelize
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
    sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config
    )
}

// create property

exports.addPropertyDetails = async (req, res) => {
    // console.log("Test1---------")
    try {
        const {
            prop_type,
            prop_address,
            street_name,
            pincode,
            landmark,
            pro_img,
            review,
            photo_req,
            user_id
        } = req.body
        // const user_id = req.params.User_id
        var createProperty = await Property.create({
            prop_type,
            prop_address,
            street_name,
            pincode,
            landmark,
            pro_img,
            review,
            photo_req,
            user_id
        })
        if (!createProperty) {
            return res.status(401).json({
                message: "Failed to create a property"
            })
        } else {
            return res.status(200).json({
                message: "property created successfully"
            })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

// get all property
exports.getAllProperty = async (req, res) => {
    console.log("property controller property type", req.body.prop_type)
    try {
        var getAllprop = await Property.findAll({
            where: {
                user_id: { [Op.not]: req.body.userId },
                prop_type: req.body.prop_type,
                isHosted: true
            },
            attributes: [
                "id",
                "user_id",
                "prop_address",
                "prop_type",
                "prop_address",
                "street_name",
                "pincode",
                "landmark",
                "pro_img",
                "review",
                "photo_req",
                "isApproved",
                "lat",
                "lon",
                "isHosted"
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
                // {
                //     model: model.Review,
                //     as: 'reviewPropId',
                //     subQuery: false,
                //     attributes: [
                //         'rev_property_id',
                //         'comment',
                //         'review',
                //         'createdAt',
                //         'updatedAt',
                //         'isApproveReview'
                //     ]
                // }
            ]
        })
        if (!getAllprop) {
            return res.status(401).json({
                message: "Failed to create a property"
            })
        } else {
            return res.status(200).json({
                message: "property created successfully",
                getAllprop
            })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

exports.getproptype = async (req, res) => {
    // var testArray = [{'prop_type' : 'flat'} ,{'prop_type' :'bunglow'}]
    try {
        const filteredPropertiesArr = []
        console.log("req----------", req.body)
        req.body.forEach(async (val, idx) => {
            // const getAllprop = await Property.findAll({
            //     where: {
            //         isApproved: true,
            //         // user_id: { [Op.not]: req.body.userId },
            //         prop_type: val
            //     },
            //     attributes: [
            //         "id",
            //         "user_id",
            //         "prop_address",
            //         "prop_type",
            //         "prop_address",
            //         "street_name",
            //         "pincode",
            //         "landmark",
            //         "pro_img",
            //         "review",
            //         "photo_req",
            //         "isApproved",
            //         "lat",
            //         "lon"
            //     ],
            //     subQuery: false,
            //     include: [
            //         {
            //             model: model.User,
            //             as: "users",
            //             subQuery: false,
            //             attributes: [
            //                 "first_name",
            //                 "last_name",
            //                 "address",
            //                 "user_img",
            //                 "contact_number",
            //                 "user_id_proof",
            //                 "having_pet",
            //                 "famaly_members_count",
            //                 "fam_members_F_name",
            //                 "fam_members_L_name",
            //                 "relation",
            //                 "password",
            //                 "email",
            //                 "isApproved",
            //                 "isActive",
            //                 "createdAt",
            //                 "updatedAt"
            //             ]
            //         }
            //     ]
            // })
            // await filteredPropertiesArr.push(getAllprop)
            // console.log("6666666666666666666666", getAllprop)
            // console.log("9999999999", filteredPropertiesArr)
        })
        // console.log("444444444444444444444444444", filteredPropertiesArr)
        return res.status(200).json(getAllprop)

        // return Promise.all(filteredPropertiesArr)
        // var getAllprop = await Property.findAll({
        //     where:{isApproved:true, user_id:{[Op.not]: req.body.userId}, prop_type:req.body.prop_type },
        //     attributes: [
        //         'id',
        //         'user_id',
        //         'prop_address',
        //         'prop_type',
        //         'prop_address',
        //         'street_name',
        //         'pincode',
        //         'landmark',
        //         'pro_img',
        //         'review',
        //         'photo_req',
        //         'isApproved',
        //         'lat',
        //         'lon'
        //     ],
        //     subQuery: false,
        //     include: [
        //         {
        //             model: model.User,
        //             as: 'users',
        //             subQuery: false,
        //             attributes: [
        //                 'first_name',
        //                 'last_name',
        //                 'address',
        //                 'user_img',
        //                 'contact_number',
        //                 'user_id_proof',
        //                 'having_pet',
        //                 'famaly_members_count',
        //                 'fam_members_F_name',
        //                 'fam_members_L_name',
        //                 'relation',
        //                 'password',
        //                 'email',
        //                 'isApproved',
        //                 'isActive',
        //                 'createdAt',
        //                 'updatedAt'
        //             ]
        //         }
        //     ]
        // })
        if (!filteredPropertiesArr) {
            return res.status(401).json({
                message: "Failed to create a property"
            })
        } else {
            return res.status(200).json({
                message: "property created successfully",
                filteredPropertiesArr
            })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

// getAll property admin

exports.getAllPropertyAdmin = async (req, res) => {
    try {
        var getAllprop = await Property.findAll({
            // where: { isApproved: true, user_id: { [Op.not]: req.body.userId } },
            order: [["id", "DESC"]],
            attributes: [
                "id",
                "user_id",
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
            subQuery: false,
            include: [
                {
                    model: model.User,
                    as: "users",
                    subQuery: false
                }

                // {
                //     model: model.Review,
                //     as: 'reviewPropId',
                //     subQuery: false,
                //     attributes: [
                //         'rev_property_id',
                //         'comment',
                //         'review',
                //         'createdAt',
                //         'updatedAt',
                //         'isApproveReview'
                //     ]
                // }
            ]
        })
        console.log("getAllprop---------", getAllprop)

        if (!getAllprop) {
            return res.status(401).json({
                message: "Failed to create a property"
            })
        } else {
            return res.status(200).json({
                message: "property created successfully",
                getAllprop
            })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

// prperty by id

exports.getPropertyByID = async (req, res) => {
    try {
        var getPropbyID = await Property.findByPk(req.params.id)
        var getAllReviews = await Review.findAll({
            where: {
                [Op.and]: [
                    { rev_property_id: req.params.id },
                    { isApproveReview: 1 }
                ]
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

        if (!getPropbyID) {
            return res.status(401).json({
                message: "property not found"
            })
        } else {
            return res.status(200).json({
                message: "your property",
                getPropbyID,
                getAllReviews
            })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

exports.getPropertyByUserID = async (req, res) => {
    try {
        const property = await Property.findOne({
            where: {
                user_id: req.body.user_id
            }
        })
        if (property) {
            res.status(200).json(property)
        } else {
            res.status(400).json("Property not found")
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

// edit property by id

exports.editPropertyByID = async (req, res) => {
    try {
        Property.findByPk(req.params.id).then((prop) => {
            Property.update(
                {
                    prop_type: req.body.prop_type || prop.prop_type,
                    prop_address: req.body.prop_address || prop.prop_address,
                    street_name: req.body.street_name || prop.street_name,
                    pincode: req.body.pincode || prop.pincode,
                    landmark: req.body.landmark || prop.landmark,
                    pro_img: req.body.pro_img || prop.pro_img,
                    review: req.body.review || prop.review,
                    photo_req: req.body.photo_req || prop.photo_req
                },
                {
                    where: {
                        id: req.params.id
                    }
                }
            )
                .then((_) => {
                    res.status(200).send({
                        message: "property updated"
                    })
                })
                .catch((err) => res.status(400).send(err))
        })
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

//update reject or accept

// exports.isApproved = async (req, res) => {
//     try {
//         // console.log("id is ---------------->", req.body)
//         const property = await Property.findByPk(req.body.id)
//         console.log(property)
//     } catch (err) {
//         console.log(err)
//     }
// }
exports.isApproved = async (req, res) => {
    try {
        console.log("id is ---------------->")
        Property.findByPk(req.body.id).then((prop) => {
            Property.update(
                {
                    isApproved: req.body.isApproved
                },
                {
                    where: {
                        id: req.params.id
                    }
                }
            )
            User.update(
                {
                    isApproved: req.body.isApproved
                },
                {
                    where: {
                        id: prop.id
                    }
                }
            )
                .then((_) => {
                    res.status(200).send({
                        message: "value updated 123"
                    })
                })
                .catch((err) => res.status(400).send(err))
        })
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

//photo request

exports.isphotoRequest = async (req, res) => {
    try {
        console.log("body id  is ---------------->", req.body.id)
        Property.findByPk(req.body.id).then((prop) => {
            Property.update(
                {
                    photo_req: req.body.photo_req
                },
                {
                    where: {
                        id: req.body.id
                    }
                }
            )
                .then((_) => {
                    res.status(200).send({
                        message: "photo required updated"
                    })
                })
                .catch((err) => res.status(400).send(err))
        })
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

// get nearby properties
exports.getNearByProperties = async (req, res) => {
    try {
        var getNearByProp = await Property.findAll({
            where: {
                prop_type: req.body.prop_type,
                isHosted: true
            },
            attributes: [
                [
                    Sequelize.literal(
                        "6371 * acos(cos(radians(" +
                        req.body.lat +
                        ")) * cos(radians(lat)) * cos(radians(" +
                        req.body.lon +
                        ") - radians(lon)) + sin(radians(" +
                        req.body.lat +
                        ")) * sin(radians(lat)))"
                    ),
                    "distance"
                ],
                "id",
                "user_id",
                "prop_address",
                "prop_type",
                "prop_address",
                "street_name",
                "pincode",
                "landmark",
                "pro_img",
                "review",
                "photo_req",
                "isApproved",
                "lat",
                "lon"

                //  [Sequelize.fn('POW',Sequelize.fn('ABS',Sequelize.literal("latitude-"+req.body.lat)),2),'x1'],
                // [Sequelize.fn('POW',Sequelize.fn('ABS',Sequelize.literal("longitude-"+req.body.lng)),2),'x2']
            ],
            order: Sequelize.col("distance"),
            limit: 10,
            // order: Sequelize.fn('SQRT', Sequelize.literal('x1+x2')),
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
        if (!getNearByProp) {
            return res.status(401).json({
                message: "Something went wrong"
            })
        } else {
            return res.status(200).json({
                message: "All Properties",
                getNearByProp
            })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
}

// get searched properties
exports.getSearchedProperties = async (req, res) => {
    try {
        const startDate = new Date(req.body.startDate)
        const endDate = new Date(req.body.endDate)

        // var bookings_start_date = await Booking.findAll({
        //     // where:{isAccepted: true, booking_user_id: req.body.userId },
        //     where :
        //         {"start_date" :
        //             {
        //                 [Op.between] : [startDate , endDate ]
        //             }
        //         }
        // })

        var booked_properties = await Booking.findAll({
            // where:{isAccepted: true, booking_user_id: req.body.userId },
            where: {
                [Op.or]: [
                    {
                        start_date: {
                            [Op.between]: [startDate, endDate]
                        }
                    },
                    {
                        end_date: {
                            [Op.between]: [startDate, endDate]
                        }
                    }
                ]
            }
        })

        // var bookings_end_date = await Booking.findAll({
        //     // where:{isAccepted: true, booking_user_id: req.body.userId },
        //     where :
        //         {"end_date" :
        //             {
        //                 [Op.between] : [startDate , endDate ]
        //             }
        //         }
        // })

        // const [results, metadata] = await sequelize.query(
        //     "SELECT * FROM property_table RIGHT JOIN bookings_table ON property_table.id = bookings_table.property_id where bookings_table.start_date NOT BETWEEN CAST('"+req.body.startDate+"' AS DATE) and CAST('"+req.body.endDate+"' AS DATE) AND bookings_table.end_date NOT BETWEEN CAST('"+req.body.startDate+"' AS DATE) and CAST('"+req.body.endDate+"' AS DATE)"
        // );

        // var isBooked = await Property.findAll({
        //     // where:{isAccepted: true, booking_user_id: req.body.userId },
        //     where : {'$Booking.stay_completed$' : true}
        // })

        // console.log("startDate------------",bookings_start_date.length)

        // if(bookings_start_date.length > 0 || bookings_end_date > 0) {
        //     return res.status(401).json({
        //         message: "Something went wrong",
        //     })
        // }

        var searchedProperties = await Property.findAll({
            where: { user_id: { [Op.not]: req.body.userId } },
            attributes: [
                [
                    Sequelize.literal(
                        "6371 * acos(cos(radians(" +
                        req.body.lat +
                        ")) * cos(radians(lat)) * cos(radians(" +
                        req.body.lon +
                        ") - radians(lon)) + sin(radians(" +
                        req.body.lat +
                        ")) * sin(radians(lat)))"
                    ),
                    "distance"
                ],
                "id",
                "user_id",
                "prop_address",
                "prop_type",
                "prop_address",
                "street_name",
                "pincode",
                "landmark",
                "pro_img",
                "review",
                "photo_req",
                "isApproved",
                "lat",
                "lon"
                //  [Sequelize.fn('POW',Sequelize.fn('ABS',Sequelize.literal("latitude-"+req.body.lat)),2),'x1'],
                // [Sequelize.fn('POW',Sequelize.fn('ABS',Sequelize.literal("longitude-"+req.body.lng)),2),'x2']
            ],
            order: Sequelize.col("distance"),
            // limit: 10,
            // order: Sequelize.fn('SQRT', Sequelize.literal('x1+x2')),
            // subQuery: false,
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

        if (!searchedProperties) {
            return res.status(401).json({
                message: "No properties found."
            })
        } else {
            return res.status(200).json({
                message: "Searched Properties",
                searchedProperties,
                booked_properties
                // bookings_start_date,
                // bookings_end_date
                // results
            })
        }
    } catch (err) {
        console.error("err----------------------", err.message)
        res.status(500).send("Server Error")
    }
}

exports.getFilteredProperties = async (req, res) => {
    try {
        const getAllprop = await Property.findAll({
            where: {
                user_id: { [Op.not]: req.body.userId }
                // prop_type: val
            },
            attributes: [
                "id",
                "user_id",
                "prop_address",
                "prop_type",
                "prop_address",
                "street_name",
                "pincode",
                "landmark",
                "pro_img",
                "review",
                "photo_req",
                "isApproved",
                "lat",
                "lon"
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
        })
        res.status(200).json(getAllprop)
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.createNewPropertyImages = async (req, res) => {
    console.log("33333333333333333", req.body.userId, req.body.prop_id)
    const user_id = req.body.userId
    const prop_id = req.body.prop_id
    try {
        const images = await NewPropertyImages.create({
            user_id: user_id,
            prop_id: prop_id
        })
        res.status(200).json({ message: "Successfullty created", images })
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.getUnapprovedImages = async (req, res) => {
    try {
        const unapprovedImages = await NewPropertyImages.findAll({
            // where: {
            //     [Op.and]: [{ isApproved: 1 }, { prop_id: req.body.prop_id }]
            // }
            where: {
                prop_id: req.body.prop_id
            }
        })
        if (unapprovedImages) {
            res.status(200).json(unapprovedImages)
        } else {
            res.status(400).json("No Images found")
        }
    } catch (err) {
        res.status(500).json(err)
    }
}
