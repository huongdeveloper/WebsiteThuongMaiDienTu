'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            Product.hasMany(models.Descriptions, { foreignKey: 'productId', as: 'imageList'});
            Product.belongsTo(models.portfolios, { foreignKey: 'portfoliosId' });
            Product.hasMany(models.Weights, { foreignKey: 'productId'});
            Product.belongsTo(models.Allcode, {foreignKey: 'hostId', targetKey: 'keyMap', as: 'hostData'})

        }
    };
    Product.init({
        name: DataTypes.STRING,
        portfoliosId: DataTypes.INTEGER,
        image: DataTypes.TEXT,
        discount: DataTypes.STRING,
        selled: DataTypes.STRING,
        inventory: DataTypes.STRING,
        hostId: DataTypes.STRING,
        contentDetailHTML: DataTypes.TEXT('long'),
        contentDetail: DataTypes.TEXT('long'),
        contentDescribeHTML: DataTypes.TEXT('long'),
        contentDescribe: DataTypes.TEXT('long'),

    }, {
        sequelize,
        modelName: 'Product',
    });
    return Product;
};