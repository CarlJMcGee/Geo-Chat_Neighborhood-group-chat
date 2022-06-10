const sequelize = require("../config/connection");
const { Model, DataTypes } = require("sequelize");

class Neighborhood extends Model {}

Neighborhood.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    modelName: "neighborhood",
    timestamps: false,
    underscored: true,
  }
);

module.exports = Neighborhood;
