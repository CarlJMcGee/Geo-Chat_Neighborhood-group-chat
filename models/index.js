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

Post.belongsTo(Neighborhood, {
  foreignKey: "neighborhood_id",
  onDelete: "SET NULL",
});

Neighborhood.hasMany(Post, {
  foreignKey: "neighborhood_id",
  onDelete: "SET NULL",
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

Comment.belongsTo(Post, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

module.exports = { User, Neighborhood, Post, Comment };
