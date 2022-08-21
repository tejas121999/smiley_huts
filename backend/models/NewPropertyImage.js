const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
    class NewPropertyImages extends Model {
        static associate(models) {
            NewPropertyImages.belongsTo(models.User, {
                foreignKey: "user_id",
                as: "users"
            })
        }
    }
    NewPropertyImages.init(
        {
            user_id: {
                type: DataTypes.INTEGER,
                field: "user_id"
            },
            prop_id: {
                type: DataTypes.INTEGER,
                field: "prop_id"
            },
            prop_img: {
                type: DataTypes.STRING,
                field: "prop_img"
            }
        },
        {
            sequelize,
            //define table name
            tableName: "new_property_images",
            modelName: "NewPropertyImages",
            timestamps: false
        }
    )
    return NewPropertyImages
}
