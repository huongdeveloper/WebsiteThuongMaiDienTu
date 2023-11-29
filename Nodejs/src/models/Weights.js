'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Weights extends Model {
        static associate(models) {
            Weights.belongsTo(models.Product, { foreignKey: 'productId'});

        }
    };
    Weights.init({
        productId: DataTypes.INTEGER,
        nameWeight: DataTypes.STRING,
        price: DataTypes.DECIMAL(10, 3)    

    }, {
        sequelize,
        modelName: 'Weights',
    });
    return Weights;
};