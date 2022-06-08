const { Neighborhood } = require("../models");

const neighborhoodList = [
  {
    name: "minnetonka",
  },
  {
    name: "st louis park",
  },
  {
    name: "bloomington",
  },
];

const seedNeighborhood = () =>
  Neighborhood.bulkCreate(neighborhoodList, {
    individualHooks: true,
  });

module.exports = seedNeighborhood;
