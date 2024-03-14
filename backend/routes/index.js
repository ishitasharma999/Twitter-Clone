const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const multer = require('multer');
const uploader = multer({ dest: 'uploads' }); //Configuring multer to store uploaded files in 'uploads' directory
const db = require("../models");
const { checkLogin } = require("../service/userService");
const { resolve } = require("path");

// Initialize the session middleware
// Database synchronization
db.sequelize.sync();

// Routes
router.get('/logout', function(req, res, next) {
  req.session.destroy(function(err) {
    if (err) {
      console.error('Error destroying session:', err);
      res.redirect('/');
    } else {
      res.redirect('/');
    }
  });
});


/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { message: "Welcome User!" });  //it renders the view defined as index
});

// async function: used to handle the request
//async=it will give asynchronus operations
// it can use await function to pause execution till promises are resolved

//get create account page on gitting this url
router.get("/create", async(req, res, next) => {
  res.render('createAccount');  //it renders the view defined as createAccount
});

//indicates route with username as part of url(comes from script in creating acc when u want to check if username available)
router.get('/check/:username', async(req, res, next) => {
  let username = req.params.username;
  let user = await db.users.findOne({ where: { username: username } });
  if (user) {
    res.json({ available: false });
  } else {
    res.json({ available: true });
  }
});

router.post('/tweettweet', async(req, res, next) => {
  let twRecv = { ...req.body };
  twRecv.userid = req.session.userid;
  console.log('twRec', twRecv);
  let tweet = await db.tweet.create(twRecv);
  res.json({ tweet });
});

router.post("/create", uploader.single('picture'), async(req, res, next) => {
  const user = req.body;
  const password = user.password;
  user.picture = req.file.path;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    username: user.username,
    passwordhash: hashedPassword,
    gender: user.gender,
    mobile: user.mobile,
    email: user.email,
    pic: user.picture,
    profiletext: user.profiletext
  };

  const userSaved = await db.users.create(newUser);
  res.render('index', { message: 'Account created successfully' });
});

router.post("/home", async function (req, res, next) {
  let username = req.body.username;
  let password = req.body.password;
  let userLoggedIn = await checkLogin(username, password);

  if (userLoggedIn) {
    req.session.username = username;
    req.session.userid = userLoggedIn.userid;
    req.session.pic=userLoggedIn.pic;
    console.log("home"+req.session.username);
    res.render("home", { username: username, picture: userLoggedIn.pic });
  } else {
    res.render("index", { message: "Invalid credentials" });
  }
});

module.exports = router;


// var express = require('express');
// var router = express.Router();

// const db= require('../models');
// // const db= require('../models/index'); --> this is equivalent to line 3

// db.sequelize.sync();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// router.post('/home',function(req,res,next)
// {
//   //check login id and password, if correct render home.ejs, else don't
//   res.render('home', {title: 'Express'});
//   //else if failed login. ewnder index.ejs with message
// })

// router.get('/createAccount', function(req, res, next) {
//   res.render('createAccount');
// });

// router.post('/createAccount',async function(req, res, next) {
//   let userrcd={...req.body};        //spread operator is used which copies the object body .... userrcd is copy of req.body .....you can add in that 
//   console.log('userrcd',userrcd);
//   let usercreated=createUser(userrcd);
//   //redirect it to home user created to login 
//   res.redirect("/?message=user%20created")

//   //res.json({status : 'user created', ...userCreated});
// });


// router.post('/checkAvailability',async function(req, res, next) {
// let username=req.body.username;
// let user= await db.users.findOne({where:{username:username}})
// if(user !=null)           //user exists,username not available 
// {
//   res.json({available :false,username:username})
// }
// else{
//   res.json({available:true,username:username})
// }
// });

// module.exports = router;


