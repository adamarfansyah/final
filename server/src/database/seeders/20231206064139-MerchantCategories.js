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
      "MerchantCategories",
      [
        {
          merchantId: 1,
          categoryId: 1,
        },
        {
          merchantId: 2,
          categoryId: 2,
        },
        {
          merchantId: 3,
          categoryId: 3,
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
    await queryInterface.bulkDelete("MerchantCategories", null, {});
  },
};
