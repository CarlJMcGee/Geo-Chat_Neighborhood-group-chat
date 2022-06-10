const User = require("./User");
const Neighborhood = require("./Neighborhood");
const Post = require("./Post");
const Comment = require("./Comments");

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

Comment.belongsTo(User, {
  foreignKey: "user_id",
  as: "commenter",
  onDelete: "CASCADE",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
  hooks: true,
  onDelete: "CASCADE",
});

module.exports = { User, Neighborhood, Post, Comment };
