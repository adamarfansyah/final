"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert(
      "Venues",
      [
        {
          name: "Lapangan GBK 1",
          merchantId: 1,
          price: 20000000,
          startHour: 8,
          endHour: 20,
          image:
            "https://images.unsplash.com/photo-1540293923757-f737135a202f?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          name: "Lapangan GBK 2",
          merchantId: 1,
          price: 20000000,
          startHour: 9,
          endHour: 21,
          image:
            "https://images.unsplash.com/photo-1540293923757-f737135a202f?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('Venues', null, {});
     */
  },
};
