const sequelize = require("../config/connection");
const seedUsers = require("./user-seed");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log(`Database Synced...`);

  await seedUsers();
  console.log(`Users Seeded...`);

  process.exit(0);
};

seedAll();
