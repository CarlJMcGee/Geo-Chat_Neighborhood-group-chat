const { User } = require("../models");

const userList = [
  {
    email: "your@email.com",
    firstName: "John",
    lastName: "Doe",
    password: "passwordlol",
    neighborhood_id: 1,
  },
  {
    email: "Joe@email.com",
    firstName: "Joe",
    lastName: "Mama",
    password: "password2@",
    neighborhood_id: 2,
  },
];

const seedUsers = () =>
  User.bulkCreate(userList, {
    individualHooks: true,
  });

module.exports = seedUsers;
