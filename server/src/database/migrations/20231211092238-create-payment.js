"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Payments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      merchantId: {
        type: Sequelize.INTEGER,
      },
      venueId: {
        type: Sequelize.INTEGER,
      },
      amount: {
        type: Sequelize.INTEGER,
      },
      orderId: {
        type: Sequelize.STRING,
      },
      transactionId: {
        type: Sequelize.STRING,
      },
      transactionTime: {
        type: Sequelize.STRING,
      },
      paymentType: {
        type: Sequelize.STRING,
      },
      startBook: {
        type: Sequelize.STRING,
      },
      endBook: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Payments");
  },
};
