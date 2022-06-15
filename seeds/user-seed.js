const { User } = require("../models");

const userList = [
  {
    email: "rick@email.com",
    firstName: "Rick",
    lastName: "Riordan",
    password: "password1!",
    neighborhood_id: 1,
  },
  {
    email: "jeff@email.com",
    firstName: "Jeff",
    lastName: "Grubb",
    password: "password2@",
    neighborhood_id: 1,
  },
  {
    email: "heather@email.com",
    firstName: "Heather",
    lastName: "Brewer",
    password: "password3#",
    neighborhood_id: 1,
  },
  {
    email: "david@email.com",
    firstName: "David",
    lastName: "Drake",
    password: "password4$",
    neighborhood_id: 1,
  },
  {
    email: "kate@email.com",
    firstName: "Kate",
    lastName: "Novak",
    password: "password5%",
    neighborhood_id: 1,
  },
  {
    email: "elaine@email.com",
    firstName: "Elaine",
    lastName: "Cunningham",
    password: "password6^",
    neighborhood_id: 1,
  },
];

const seedUsers = () =>
  User.bulkCreate(userList, {
    individualHooks: true,
  });

module.exports = seedUsers;
