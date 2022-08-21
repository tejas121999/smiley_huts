// const { Model } = require("sequelize")
// module.exports = (sequelize, DataTypes) => {
//     class Property extends Model {
//         static associate(models) {
//             Property.belongsTo(models.User, {
//                 foreignKey: "user_id",
//                 as: "users"
//             })

//             Property.hasMany(models.Review, {
//                 foreignKey: "rev_property_id"
//             })

//             Property.hasMany(models.Booking, {
//                 foreignKey: "property_id"
//             })
//         }

//         // static associate(models) {
//         // Property.hasMany(models.Review, {
//         //     foreignKey: 'rev_property_id'
//         // })
//         // }

//         // static associate(models) {
//         // Property.hasMany(models.Booking, {
//         //     foreignKey: 'property_id'
//         // })
//         // }
//     }
//     Property.init(
//         {
//             user_id: {
//                 type: DataTypes.INTEGER,
//                 field: "user_id"
//             },
//             prop_type: {
//                 type: DataTypes.STRING,
//                 field: "prop_type"
//             },
//             prop_address: {
//                 type: DataTypes.STRING,
//                 field: "prop_address"
//             },
//             street_name: {
//                 type: DataTypes.STRING,
//                 field: "street_name"
//             },
//             pincode: {
//                 type: DataTypes.STRING,
//                 field: "pincode"
//             },
//             landmark: {
//                 type: DataTypes.STRING,
//                 field: "landmark"
//             },
//             pro_img: {
//                 type: DataTypes.STRING,
//                 field: "pro_img"
//             },
//             review: {
//                 type: DataTypes.STRING,
//                 field: "review"
//             },
//             photo_req: {
//                 type: DataTypes.BOOLEAN,
//                 field: "photo_req"
//             },
//             isApproved: {
//                 type: DataTypes.BOOLEAN,
//                 field: "isApproved"
//             },
//             lat: {
//                 type: DataTypes.DECIMAL,
//                 field: "lat"
//             },
//             lon: {
//                 type: DataTypes.DECIMAL,
//                 field: "lon"
//             }
//         },
//         {
//             sequelize,
//             //define table name
//             tableName: "property_table",
//             modelName: "Property",
//             timestamps: false
//         }
//     )
//     return Property
// }

const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class Property extends Model {
        static associate(models) {
            Property.belongsTo(models.User, {
                foreignKey: "user_id",
                as: "users"
            })

            Property.hasMany(models.Review, {
                foreignKey: "rev_property_id"
            })

            Property.hasMany(models.Booking, {
                foreignKey: "property_id"
            })
        }

        // static associate(models) {
        // Property.hasMany(models.Review, {
        //     foreignKey: 'rev_property_id'
        // })
        // }

        // static associate(models) {
        // Property.hasMany(models.Booking, {
        //     foreignKey: 'property_id'
        // })
        // }
    }
    Property.init(
        {
            user_id: {
                type: DataTypes.INTEGER,
                field: "user_id"
            },
            prop_type: {
                type: DataTypes.STRING,
                field: "prop_type"
            },
            prop_address: {
                type: DataTypes.STRING,
                field: "prop_address"
            },
            street_name: {
                type: DataTypes.STRING,
                field: "street_name"
            },
            pincode: {
                type: DataTypes.STRING,
                field: "pincode"
            },
            landmark: {
                type: DataTypes.STRING,
                field: "landmark"
            },
            pro_img: {
                type: DataTypes.STRING,
                field: "pro_img"
            },
            review: {
                type: DataTypes.STRING,
                field: "review"
            },
            photo_req: {
                type: DataTypes.BOOLEAN,
                field: "photo_req"
            },
            isApproved: {
                type: DataTypes.BOOLEAN,
                field: "isApproved"
            },
            lat: {
                type: DataTypes.DECIMAL,
                field: "lat"
            },
            lon: {
                type: DataTypes.DECIMAL,
                field: "lon"
            },
            isHosted: {
                type: DataTypes.BOOLEAN,
                field: "isHosted"
            }
        },
        {
            sequelize,
            //define table name
            tableName: "property_table",
            modelName: "Property",
            timestamps: false
        }
    )
    return Property
}
