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
          status: false,
          image:
            "https://images.unsplash.com/photo-1540293923757-f737135a202f?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          name: "Lapangan GBK 2",
          merchantId: 1,
          price: 20000000,
          startHour: 9,
          endHour: 21,
          status: false,
          image:
            "https://images.unsplash.com/photo-1540293923757-f737135a202f?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          name: "Lapangan Pancoran Soccer Field 1",
          merchantId: 2,
          price: 1500000,
          startHour: 9,
          endHour: 21,
          status: false,
          image:
            "https://lh3.googleusercontent.com/p/AF1QipNU18R614jnBk1ua6QdcMzo2xE-KoCjB3wQgD7d=s1360-w1360-h1020",
        },
        {
          name: "Badminton Hall Santa 1",
          merchantId: 3,
          price: 1500000,
          startHour: 9,
          endHour: 21,
          status: false,
          image:
            "https://lh3.googleusercontent.com/p/AF1QipNXWcBsTnU9nrY4D3awQ5o1wFRG2yd_w1dAdhPT=s1360-w1360-h1020",
        },
        {
          name: "Badminton Hall Santa 2",
          merchantId: 3,
          price: 1500000,
          startHour: 9,
          endHour: 21,
          status: false,
          image:
            "https://lh3.googleusercontent.com/p/AF1QipO2Jpy2O9tjkP6klU4z9uCVAx8wH7ZUzfmS1hMg=s1360-w1360-h1020",
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
    await queryInterface.bulkDelete("Venues", null, {});
  },
};
