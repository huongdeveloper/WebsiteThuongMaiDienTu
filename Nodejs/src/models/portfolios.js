'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class portfolios extends Model {
        static associate(models) {
            portfolios.hasMany(models.Product, { foreignKey: 'portfoliosId' });
        }
    };
    portfolios.init({
        name: DataTypes.STRING,
        image: DataTypes.TEXT,


    }, {
        sequelize,
        modelName: 'portfolios',
    });
    return portfolios;
};