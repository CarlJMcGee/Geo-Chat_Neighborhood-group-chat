const sequelize = require("../config/connection");
const { Model, DataTypes } = require("sequelize");
const Filter = require("bad-words");
const censor = new Filter();

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1, 500],
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    neighborhood_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "neighborhood",
        key: "id",
      },
    },
  },
  {
    hooks: {
      beforeCreate(newPostData) {
        let acceptable =
          censor.isProfane(newPostData.title) ||
          censor.isProfane(newPostData.content)
            ? false
            : true;
        console.log(acceptable);
        return (newPostData.isAcceptable = acceptable);
      },
      beforeUpdate(updatedPostData) {
        let acceptable =
          censor.isProfane(updatedPostData.title) ||
          censor.isProfane(updatedPostData.content)
            ? false
            : true;

        return (updatedPostData.isAcceptable = acceptable);
      },
    },
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "post",
    timestamps: true,
  }
);

module.exports = Post;
