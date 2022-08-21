const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasOne(models.Property, {
                foreignKey: "user_id"
            })
            User.hasMany(models.NewPropertyImages, {
                foreignKey: "user_id"
            })

            User.hasMany(models.Campaigns, {
                foreignKey: "user_id"
            })

            User.hasMany(models.Setting, {
                foreignKey: "user_id"
            })

            User.hasMany(models.Review, {
                foreignKey: "prop_user_id"
            })

            User.hasMany(models.Booking, {
                foreignKey: "booking_user_id"
            })

            User.hasMany(models.Famaly, {
                foreignKey: "fam_user_id"
            })

            User.hasMany(models.Offer, {
                foreignKey: "offer_user_id"
            })

            User.belongsTo(models.Subscription, {
                foreignKey: "subscription_id",
                as: "sub_users_id"
            })
        }
    }

    User.init(
        {
            first_name: {
                type: DataTypes.STRING,
                field: "first_name"
            },
            last_name: {
                type: DataTypes.STRING,
                field: "last_name"
            },
            address: {
                type: DataTypes.STRING,
                field: "address"
            },
            user_img: {
                type: DataTypes.STRING,
                field: "user_img"
            },
            contact_number: {
                type: DataTypes.STRING,
                field: "contact_number"
            },
            user_id_proof: {
                type: DataTypes.STRING,
                field: "user_id_proof"
            },
            // property_id: {
            //     type: DataTypes.INTEGER,
            //     field: 'property_id'
            // },
            having_pet: {
                type: DataTypes.BOOLEAN,
                field: "having_pet",
                defaultValue: true
            },

            password: {
                type: DataTypes.STRING,
                field: "password"
            },
            email: {
                type: DataTypes.STRING,
                field: "email"
            },
            isApproved: {
                type: DataTypes.BOOLEAN,
                field: "isApproved",
                defaultValue: false
            },
            famaly_members_count: {
                type: DataTypes.INTEGER,
                field: "famaly_members_count",
                defaultValue: 0
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                field: "isActive",
                defaultValue: true
            },
            subscription_id: {
                type: DataTypes.INTEGER,
                field: 'subscription_id'
            },
            sub_amount: {
                type: DataTypes.INTEGER,
                field: 'sub_amount'
            },
            sub_duration: {
                type: DataTypes.INTEGER,
                field: 'sub_amount'
            },
            subscription_start_date: {
                type: DataTypes.DATE,
                field: "subscription_start_date"
            },
            subscription_end_date: {
                type: DataTypes.DATE,
                field: "subscription_end_date"
            },
            isAdmin: {
                type: DataTypes.BOOLEAN,
                field: "isAdmin",
                defaultValue: 0
            },
            emailToken: {
                type: DataTypes.STRING,
                field: "emailToken"
            },
            isVerified: {
                type: DataTypes.BOOLEAN,
                field: "isVerified",
                defaultValue: 0
            },
            resetPasswordToken: {
                type: DataTypes.STRING,
                field: "resetPasswordToken"
            },
            resetPasswordExpires: {
                type: DataTypes.DATE,
                field: "resetPasswordExpires"
            },
            createdAt: {
                type: DataTypes.DATE,
                field: "createdAt"
            },
            updatedAt: {
                type: DataTypes.DATE,
                field: "updatedAt"
            }
        },
        {
            sequelize,
            //define table name
            tableName: "users_tables",
            modelName: "User"
        }
    )
    return User
}
