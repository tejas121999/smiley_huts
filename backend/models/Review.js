const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class Review extends Model {
        static associate(models) {
            Review.belongsTo(models.Property, {
                foreignKey: "rev_property_id",
                as: "propId"
            })
            Review.belongsTo(models.User, {
                foreignKey: "prop_user_id",
                as: "users"
            })
        }
    }
    Review.init(
        {
            prop_user_id: {
                type: DataTypes.INTEGER,
                field: "prop_user_id"
            },

            rev_property_id: {
                type: DataTypes.INTEGER,
                field: "rev_property_id"
            },

            comment: {
                type: DataTypes.STRING,
                field: "comment"
            },
            review_imgs: {
                type: DataTypes.STRING,
                field: "review_imgs"
            },
            review: {
                type: DataTypes.INTEGER,
                field: "review"
            },

            createdAt: {
                type: DataTypes.DATE,
                field: "createdAt"
            },

            updatedAt: {
                type: DataTypes.DATE,
                field: "updatedAt"
            },

            isApproveReview: {
                type: DataTypes.BOOLEAN,
                field: "isApproveReview",
                defaultValue: false
            }
        },
        {
            sequelize,
            //define table name
            tableName: "reviews",
            modelName: "Review"
        }
    )
    return Review
}
