// connects to the database
// Importing the DataTypes object from the sequelize library
const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

// object(if no table create one) -> table -> express-router -> so without creating the table we get the table
module.exports = (sequelize, DataTypes) => {
  const tweet = sequelize.define(
    "tweet",
    {
      twid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      twtext: DataTypes.STRING,
      userid: DataTypes.INTEGER,
      media: DataTypes.STRING(1000),
      numlikes: {
        type:DataTypes.INTEGER,
        default:0
      },
      numretweets:{
        type:DataTypes.INTEGER,
        default:0
      },
      twtime:{
         type:DataTypes.DATE,
         defaultValue: DataTypes.NOW
        }
    },
    {
      tableName: "tweet",
      timestamps: false, // no created at & no updated at in the table
    }
  );
  return tweet;
};