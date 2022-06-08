const sequelize = require("../config/connection");
const seedNeighborhood = require("./neighborhood-seed");
const seedPosts = require("./post-seed");
const seedUsers = require("./user-seed");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log(`Database Synced...
  ...`);

  await seedNeighborhood();
  console.log(`Neighborhoods Seeded...
  ...`);

  await seedUsers();
  console.log(`Users Seeded...
  ...`);

  await seedPosts();
  console.log(`Posts Seeded...
  ...`);

  process.exit(0);
};

seedAll();
