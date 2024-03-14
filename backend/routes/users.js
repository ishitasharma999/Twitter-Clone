var express = require("express");
var bcrypt = require('bcrypt');
var router = express.Router();
const multer = require('multer');
const uploader = multer({ dest: 'uploads' });
const db = require("../models");

// router.get('/', function (req, res, next) {
//   res.send('respond with a resource');
// });

router.get("/updateProfile", async (req, res) => {
  if(!req.session.username){
    res.render('index',{message:"Please login first!"})
  }
  else{
    let username = req.session.username;
    var user = await db.users.findOne({ where: { username: username } });
    
      res.render('updateProfile', {
        username: user.username, 
        gender: user.gender,
        mobile: user.mobile,
        email: user.email,
        profiletext: user.profiletext
      })
    }
});

router.post('/update', uploader.single('picture'), async (req, res, next) => {
  const details = req.body;

  const user = await db.users.findOne({ where: { username: req.body.username } });

  if (!user) {
    return res.json({ message: `User with username ${req.body.username} doesn't exist` });
  }

  if (req.file) {
    // Update profile picture path if a new picture was uploaded
    user.pic = req.file.path;
    req.session.pic = req.file.path; // Update session with new profile picture
  }

  if (details.password !== undefined && details.password !== "") {
    const hashedPassword = await bcrypt.hash(details.password, 10);
    user.passwordhash = hashedPassword;
  }

  if (details.gender !== undefined && details.gender !== "")
    user.gender = details.gender;

  if (details.mobile !== undefined && details.mobile !== "")
    user.mobile = details.mobile;

  if (details.email !== undefined && details.email !== "")
    user.email = details.email;

  if (details.profiletext !== undefined && details.profiletext !== "")
    user.profiletext = details.profiletext;

  try {
    // Save the updated user
    await user.save();
    const script = `<script>
    alert("Successfully Updated");
    window.location.href="/users/updateProfile";
    </script>`; //redirects the browser to the "/users/updateProfile" URL.
    res.send(script);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/', (req, res) => {
  console.log(req.session.pic+" pic is here");
  res.render("home", { username: req.session.username, picture: req.session.pic });
});

module.exports = router;



// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;
