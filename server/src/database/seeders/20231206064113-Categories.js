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
      "Categories",
      [
        {
          id: 1,
          name: "Sepak Bola",
        },
        {
          id: 2,
          name: "Mini Soccer",
        },
        {
          id: 3,
          name: "Bulu Tangkis",
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
     */
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
