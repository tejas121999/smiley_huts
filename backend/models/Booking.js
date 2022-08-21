const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Booking extends Model {

        static associate(models) {
            Booking.belongsTo(models.Property, {
                foreignKey: 'property_id',
                as: 'propId'
            })

            Booking.belongsTo(models.User, {
                foreignKey: 'booking_user_id',
                as: 'users'
            })
        }


    };
    Booking.init({
        booking_user_id: {
            type: DataTypes.INTEGER,
            field: 'booking_user_id'
        },

        booking_month: {
            type: DataTypes.INTEGER,
            field: 'booking_month'
        },

        property_id: {
            type: DataTypes.INTEGER,
            field: 'property_id'
        },

        stay_completed: {
            type: DataTypes.BOOLEAN,
            field: 'stay_completed',
            defaultValue: false
        },

        start_date: {
            type: DataTypes.DATE,
            field: "start_date"
        },

        end_date: {
            type: DataTypes.DATE,
            field: 'end_date',
        },

        booking_ammount: {
            type: DataTypes.INTEGER,
            field: 'booking_ammount'
        },

        transactio_id: {
            type: DataTypes.STRING,
            field: 'transactio_id'
        },

        payment_methode: {
            type: DataTypes.STRING,
            field: 'payment_methode'
        },

        isAccepted: {
            type: DataTypes.BOOLEAN,
            field: 'isAccepted',
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
            tableName: 'bookings_table',
            modelName: 'Booking',
        });
    return Booking;
};