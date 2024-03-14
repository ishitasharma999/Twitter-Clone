'use strict';
// enables strict mode in JavaScript, which helps catch common coding errors and ensures more secure and optimized code.
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {}; //An empty object that will store Sequelize models

let sequelize; //Initializes a Sequelize instance (sequelize) 
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
// if the env var gives what db and all to use, use that, else, pick from given in config and use that

fs
  .readdirSync(__dirname)     // reads the contents of the current directory synchronously (blocking operation) and returns an array of file names.
  .filter(file => {           //filters the array of file names based on the specified conditions.
    return (
      file.indexOf('.') !== 0 &&  //Excludes files starting with a dot 
      file !== basename &&        //Excludes the current file
      file.slice(-3) === '.js' && //Excludes files not ending with .js
      file.indexOf('.test.js') === -1 // Excludes files containing .test.js in their name
    );
  })
  .forEach(file => {              //iterates over the filtered array of file names.
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);  //It requires the model file, which returns the exported model function, then it By passing sequelize and Sequelize.DataTypes as arguments, the model function gains access to the Sequelize instance and data types, allowing it to define the model using Sequelize's API.
    db[model.name] = model;         //adds the initialized model to the db object with the model's name as the key. This allows accessing the model by its name (e.g., db.User) elsewhere in the application.
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {  //Accesses the model object associated with the current model name. and Checks if the model object has an associate function defined.
    db[modelName].associate(db);  //If the model has an associate function, it is invoked with the db object as an argument. This function is responsible for defining associations between the current model and other models in the application.
  }
});

db.sequelize = sequelize;   //assigns the initialized Sequelize instance (sequelize) to the sequelize property of the db object. This allows other parts of the application to access the Sequelize instance, enabling interactions with the database.
db.Sequelize = Sequelize;   //assigns the Sequelize constructor (Sequelize) to the Sequelize property of the db object. This property can be useful for accessing Sequelize's static methods and constants.

module.exports = db;
//This statement makes the db object available for use outside the current module.4
//then we can require this anywhere else to use it