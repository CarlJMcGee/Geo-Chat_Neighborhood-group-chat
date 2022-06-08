const User = require("./User");
const Neighborhood = require("./Neighborhood");
const Post = require("./Post");

User.belongsTo(Neighborhood, {
  foreignKey: "neighborhood_id",
  onDelete: "SET NULL",
  hooks: true,
});

Neighborhood.hasMany(User, {
  foreignKey: "neighborhood_id",
  as: "Neighbor",
  onDelete: "SET NULL",
  hooks: true,
});

Post.belongsTo(User, {
  foreignKey: "user_id",
  as: "OP",
  onDelete: "CASCADE",
});

User.hasMany(Post, {
  foreignKey: "user_id",
  hooks: true,
  onDelete: "CASCADE",
});

module.exports = { User, Neighborhood, Post };
