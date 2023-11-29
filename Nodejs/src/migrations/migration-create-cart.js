'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Cart', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            quantitys: {
                type: Sequelize.STRING
            },
            image: {
                type: Sequelize.BLOB('long'),
            },
            price: {
                type: Sequelize.STRING
            },
            discount: {
                type: Sequelize.STRING
            },
            paymentMethod: {
                type: Sequelize.STRING
            },
            date: {
                type: Sequelize.STRING
            },
            statusId: {
                type: Sequelize.STRING
            },
            token: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Cart');
    }
};