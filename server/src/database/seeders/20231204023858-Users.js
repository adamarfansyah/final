"use strict";

const { PasswordHashing } = require("../../helpers/HashPassword");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          id: 1,
          username: "@adamarfansyah",
          email: "adamsakearfansyah@gmail.com",
          password: await PasswordHashing("adam123"),
          accessToken: null,
          resetPasswordToken: null,
          firstName: "Adam",
          lastName: "Sake",
          phoneNumber: "085920687294",
          image: "https://i.ibb.co/MPybtjj/image.png",
        },
        {
          id: 2,
          username: "@adam2",
          email: "adamsake11@gmail.com",
          password: await PasswordHashing("adam123"),
          accessToken: null,
          resetPasswordToken: null,
          firstName: "Adam",
          lastName: "Arfansyah",
          phoneNumber: "085920287294",
          image: "https://i.ibb.co/MPybtjj/image.png",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
