const { Neighborhood } = require("../models");

const neighborhoodList = [
  {
    name: "minneapolis",
  },
];

const seedNeighborhood = () =>
  Neighborhood.bulkCreate(neighborhoodList, {
    individualHooks: true,
  });

module.exports = seedNeighborhood;
