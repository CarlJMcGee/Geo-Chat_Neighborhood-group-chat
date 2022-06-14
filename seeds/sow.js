const sequelize = require("../config/connection");
const { User, Neighborhood, Comment, Post } = require("../models");

const sowAll = async () => {
  await sequelize.sync({ force: true });

  console.log(`Database Fields Sown...`);

  process.exit(0);
};

sowAll();
