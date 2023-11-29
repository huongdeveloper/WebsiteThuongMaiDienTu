'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('products', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            portfoliosId: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            image: {
                type: Sequelize.BLOB('long'),
            },
            discount: {
                type: Sequelize.STRING
            },
            selled: {
                type: Sequelize.STRING
            },
            inventory: {
                type: Sequelize.STRING
            },
            hostId: {
                type: Sequelize.STRING
            },
            contentDetailHTML: {
                type: Sequelize.TEXT('long')
            },
            contentDetail: {
                type: Sequelize.TEXT('long')
            },
            contentDescribeHTML: {
                type: Sequelize.TEXT('long')
            },
            contentDescribe: {
                type: Sequelize.TEXT('long')
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
        await queryInterface.dropTable('products');
    }
};