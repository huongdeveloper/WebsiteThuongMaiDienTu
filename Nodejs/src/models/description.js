'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Descriptions extends Model {
        static associate(models) {
            Descriptions.belongsTo(models.Product, { foreignKey: 'productId', targetKey: 'id', as: 'imageList'});

        }
    };
    Descriptions.init({
        productId: DataTypes.INTEGER,
        imageUrl: DataTypes.TEXT,
        

    }, {
        sequelize,
        modelName: 'Descriptions',
    });
    return Descriptions;
};