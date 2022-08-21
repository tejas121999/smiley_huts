const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Subscription extends Model {
        static associate(models) {
            // Subscription.belongsTo(models.User, {
            //     foreignKey: 'user_id',
            //     as: 'users'
            // })

            Subscription.hasOne(models.Payment, {
                foreignKey: "subscription_id"
            })

        }
    };
    Subscription.init({
        price: {
            type: DataTypes.INTEGER,
            field: 'price'
        },
        description: {
            type: DataTypes.STRING,
            field: 'description'
        },
        select_sub_month: {
            type: DataTypes.INTEGER,
            field: 'select_sub_month'
        },
        isSubscription: {
            type: DataTypes.BOOLEAN,
            field: 'isSubscription',
            defaultValue: false
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'createdAt'
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updatedAt'
        }
    },
        {
            sequelize,
            //define table name
            tableName: 'subscription_table',
            modelName: 'Subscription',
            // timestamps: false
        });
    return Subscription;
};