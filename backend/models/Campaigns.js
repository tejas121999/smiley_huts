const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Campaigns extends Model {
        static associate(models) {
            Campaigns.belongsTo(models.User, {
                foreignKey: 'user_id',
                as: 'users'
            })
        }

    };
    Campaigns.init({
        user_id: {
            type: DataTypes.INTEGER,
            field: 'user_id'
        },
        isDraft: {
            type: DataTypes.BOOLEAN,
            field: 'isDraft',
            defaultValue: false
        },
        write_email: {
            type: DataTypes.STRING,
            field: 'write_email'
        },

        recipients: {
            type: DataTypes.INTEGER,
            field: 'recipients'
        },
        isScheduled: {
            type: DataTypes.BOOLEAN,
            field: 'isScheduled',
            defaultValue: true
        },
        delivery_date: {
            type: DataTypes.DATE,
            field: 'delivery_date'
        },
        open_count: {
            type: DataTypes.INTEGER,
            field: 'open_count'
        },
        schedule_by: {
            type: DataTypes.STRING,
            field: 'schedule_by'
        },
        campaigns_title: {
            type: DataTypes.STRING,
            field: 'campaigns_title'
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
            tableName: 'campaigns_table',
            modelName: 'Campaigns',
        });
    return Campaigns;
};