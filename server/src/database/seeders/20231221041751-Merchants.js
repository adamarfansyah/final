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
          status: false,
          image:
            "https://images.unsplash.com/photo-1540293923757-f737135a202f?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          name: "Lapangan Sepak Bola Blok S",
          email: "bloks@mail.com",
          password: await PasswordHashing("adam123"),
          address:
            "Jl. Suryo, RT.5/RW.6, Rw. Bar., Kec. Kby. Baru, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12180",
          phoneNumber: "093102931",
          latitude: -6.2364893,
          longitude: 106.8235982,
          status: false,
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
     */
    await queryInterface.bulkDelete("Merchants", null, {});
  },
};
