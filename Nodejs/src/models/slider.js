'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Sliders extends Model {
        static associate(models) {
            Sliders.belongsTo(models.Allcode, {foreignKey: 'sliderId', targetKey: 'keyMap', as: 'SliderData'})
        }
    };
    Sliders.init({
        sliderId: DataTypes.STRING,
        image: DataTypes.TEXT,
        

    }, {
        sequelize,
        modelName: 'Sliders',
    });
    return Sliders;
};