'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  };
  User.init({
    name: DataTypes.STRING,
    phonenumber: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.TEXT,
    roleId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};