const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Payment extends Model {
        static associate(models) {
            Payment.belongsTo(models.User, {
                foreignKey: 'user_id',
                as: 'users'
            })
            Payment.belongsTo(models.Subscription, {
                foreignKey: 'subscription_id',
                as: 'sub_id'
            })
        }
    }

    Payment.init({
        user_id: {
            type: DataTypes.INTEGER,
            field: 'user_id'
        },

        // subscription_id: {
        //     type: DataTypes.INTEGER,
        //     field: 'subscription_id'
        // },

        order_id: {
            type: DataTypes.INTEGER,
            field: 'order_id'
        },
        payer_id: {
            type: DataTypes.STRING,
            field: 'payer_id'
        },
        facilitator_access_token: {
            type: DataTypes.STRING,
            field: 'facilitator_access_token'
        },
        payment_source: {
            type: DataTypes.STRING,
            field: 'payment_source'
        },
        payment_method: {
            type: DataTypes.STRING,
            field: 'payment_method'
        },
        amount: {
            type: DataTypes.INTEGER,
            field: 'amount'
        },
    },
        {
            sequelize,
            tableName: 'payments',
            modelName: 'Payment',
        });

    return Payment;
};  