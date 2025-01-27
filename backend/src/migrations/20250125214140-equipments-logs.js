'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('equipments_logs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      equipmentId: {
        type: Sequelize.STRING
      },
      timestamp: {
        allowNull: false,
        type: Sequelize.DATE
      },
      value: {
        type: Sequelize.DECIMAL
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Equipments');
  }
};
