const { User } = require("../models");

const userList = [
  {
    email: "your@email.com",
    firstName: "John",
    lastName: "Doe",
    password: "passwordlol",
  },
];

const seedUsers = () =>
  User.bulkCreate(userList, {
    individualHooks: true,
  });

module.exports = seedUsers;
