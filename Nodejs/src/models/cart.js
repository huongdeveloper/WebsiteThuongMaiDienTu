'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    // ========= Thông tin chi tiết bác sĩ ===========
    class Cart extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Cart.init({
        userId: DataTypes.INTEGER,
        name: DataTypes.STRING,
        quantitys: DataTypes.STRING,
        image: DataTypes.STRING,
        price: DataTypes.STRING,
        discount: DataTypes.STRING,
        paymentMethod: DataTypes.STRING,
        date: DataTypes.STRING,
        statusId: DataTypes.STRING,
        token: DataTypes.STRING,

    }, {
        sequelize,
        modelName: 'Cart',
    });
    return Cart;
};