const User = require("./User");
const Neighborhood = require("./Neighborhood");

User.belongsTo(Neighborhood, {
  as: "Neighbor",
  foreignKey: "neighborhood_id",
  onDelete: "SET NULL",
  hooks: true,
});

Neighborhood.hasMany(User, {
  foreignKey: "neighborhood_id",
  onDelete: "SET NULL",
  hooks: true,
});

module.exports = { User, Neighborhood };
