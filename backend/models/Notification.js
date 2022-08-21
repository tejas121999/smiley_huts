const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class Notification extends Model {
        static associate(models) {
            Notification.belongsTo(models.User, {
                foreignKey: "userId",
                as: "users"
            })
        }
    }
    Notification.init(
        {
            userId: {
                type: DataTypes.INTEGER,
                field: "userId"
            },

            title: {
                type: DataTypes.STRING,
                field: "title"
            },

            desc: {
                type: DataTypes.STRING,
                field: "desc"
            },

            date_time: {
                type: DataTypes.DATE,
                field: "date_time"
            },

            notification_type: {
                type: DataTypes.INTEGER,
                field: "notification_type"
            },
            read_unread: {
                type: DataTypes.INTEGER,
                field: "read_unread"
            },
            review_userid: {
                type: DataTypes.INTEGER,
                field: "review_userid"
            },
            property_id: {
                type: DataTypes.INTEGER,
                field: "property_id"
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
            tableName: "notification_table",
            modelName: "Notification"
        }
    )
    return Notification
}
