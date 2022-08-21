const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Setting extends Model {
        static associate(models) {
            Setting.belongsTo(models.User, {
                foreignKey: 'user_id',
                as: 'users'
            })
        }
    };
    Setting.init({
        user_id: {
            type: DataTypes.INTEGER,
            field: 'user_id'
        },
        guest_req_notifi: {
            type: DataTypes.BOOLEAN,
            field: 'guest_req_notifi',
            defaultValue: true

        },
        review_rating_notifi: {
            type: DataTypes.BOOLEAN,
            field: 'review_rating_notifi',
            defaultValue: true
        },
        guest_review_notifi_email: {
            type: DataTypes.BOOLEAN,
            field: 'guest_review_notifi_email',
            defaultValue: true
        },
        review_rating_notification_email: {
            type: DataTypes.BOOLEAN,
            field: 'review_rating_notification_email',
            defaultValue: true
        }
    },
        {
            sequelize,
            //define table name
            tableName: 'setting_table',
            modelName: 'Setting',
            timestamps: false
        });
    return Setting;
};
