// logic for checking the password
const db = require("../models");
const { comparePass } = require("./bcryptService"); //we are using the function we made to compare passwords

// const bcrypt=require('bcrypt');

// Function to check login credentials
const checkLogin = async (username, password) => {

  //// Find user in the database by username
  let user = await db.users.findOne({ where: { username: username } });
  if(user){ //if user exsts compare passwords
    var equalpass = await comparePass(password,user.passwordhash);
  }
  if (user!=null && equalpass) {      //passwords match, return user object
    return user;
  }
  
  else return undefined;    //else  return undefined indicating invalid credentials
};
module.exports = { checkLogin };