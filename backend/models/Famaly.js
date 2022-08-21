const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class Famaly extends Model {
        static associate(models) {
            Famaly.belongsTo(models.User, {
                foreignKey: "fam_user_id",
                as: "famUserId"
            })
        }
    }
    Famaly.init(
        {
            fam_user_id: {
                type: DataTypes.INTEGER,
                field: "fam_user_id"
            },
            member_name: {
                type: DataTypes.STRING,
                field: "member_name"
            },
            member_relation: {
                type: DataTypes.STRING,
                field: "member_relation"
            },
            // famalyMember_count: {
            //     type: DataTypes.INTEGER,
            //     field: 'famalyMember_count'
            // },
            createdAt: {
                type: DataTypes.DATE,
                field: "createdAt"
            },
            updatedAt: {
                type: DataTypes.DATE,
                field: "updatedAt"
            },
            family_member_img: {
                type: DataTypes.STRING,
                field: "family_member_img"
            }
        },
        {
            sequelize,
            //define table name
            tableName: "famaly_table",
            modelName: "Famaly"
        }
    )
    return Famaly
}
