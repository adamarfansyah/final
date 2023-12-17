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
      "Communities",
      [
        {
          adminCommunityId: 1,
          name: "Club Renang Puri",
          province: "Jawa Barat",
          city: "Bekasi",
          address: "Puri Gading Sport Center",
          thumbnail: "https://i.ibb.co/Fb9zm3J/login.jpg",
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
    await queryInterface.bulkDelete("Communities", null, {});
  },
};
