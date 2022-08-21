const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Offer extends Model {
        static associate(models) {
            Offer.belongsTo(models.User, {
                foreignKey: 'offer_user_id',
                as: 'users'
            })
        }
    };
    Offer.init({
        offer_user_id: {
            type: DataTypes.INTEGER,
            field: 'offer_user_id'
        },

        offers_name: {
            type: DataTypes.STRING,
            field: 'offers_name'
        },

        offer_desc: {
            type: DataTypes.STRING,
            field: 'offer_desc'
        },

        offer_terms: {
            type: DataTypes.STRING,
            field: 'offer_terms'
        },

        isOffer: {
            type: DataTypes.BOOLEAN,
            field: 'isOffer'
        },

        isMember: {
            type: DataTypes.INTEGER,
            field: 'isMember'
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
            tableName: 'offers_table',
            modelName: 'Offer',
        });
    return Offer;
};