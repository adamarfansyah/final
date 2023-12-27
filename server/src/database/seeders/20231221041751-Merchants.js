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
      "Merchants",
      [
        {
          name: "Gelora Bung Karno",
          email: "gelorabungkarno@mail.com",
          password: await PasswordHashing("adam123"),
          address:
            "Jl. Pintu Satu Senayan, Gelora, Kecamatan Tanah Abang, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10270",
          phoneNumber: "0198230981231",
          latitude: -6.2186435,
          longitude: 106.7991978,
          city: "Jakarta Pusat",
          status: false,
          image:
            "https://images.unsplash.com/photo-1540293923757-f737135a202f?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          name: "Pancoran Soccer Field",
          email: "pancoran@mail.com",
          password: await PasswordHashing("adam123"),
          address: " Jl. Gatot Subroto No.72, RT.1/RW.4, Pancoran, Kec. Pancoran",
          phoneNumber: "093102931",
          latitude: -6.2364893,
          longitude: 106.8235982,
          city: "Jakarta Selatan",
          status: false,
          image:
            "https://lh3.googleusercontent.com/p/AF1QipPMs6FLN01nz65VyGW8EHNYGEBd-6Ct2f5BmhPI=s1360-w1360-h1020",
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
    await queryInterface.bulkDelete("Merchants", null, {});
  },
};
