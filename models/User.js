const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection.js");
const bcrypt = require("bcrypt");

class User extends Model {
  checkPassword(loginPass) {
    return bcrypt.compare(loginPass, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6],
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
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      async beforeUpdate(updatedUserData) {
<<<<<<< HEAD
      beforeCreate: async (newUserData) => {
        newUserData.dataValues.password = await bcrypt.hash(
          newUserData.dataValues.password,
          10
        );
        return newUserData;
      },

      beforeUpdate: async (updatedUserData) => {
=======
>>>>>>> e11a7d1fad3238a27ba7ca8ec330200a60914c9a
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: "user",
    underscored: true,
  }
);

module.exports = User;
