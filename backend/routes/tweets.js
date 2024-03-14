// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get("/", function(req, res, next) {
//   res.send('all tweets');
// });
// router.post('/', async (req, res, next)=> {
//   let tweetrec={...req.body};
//   console.log('tweetrec:>>',tweetrec);
//   tweetrec.userid = req.session.user.id; //add user id to the record
//   let tweet=await db.tweet.create(tweetrec);//create a new tweet with this data
//   res.json({tweet})
// }
// )
// module.exports = router;

var express = require('express');
var router = express.Router();
const db = require("../models");

const multer = require('multer');
const uploader = multer({dest: "uploads"});

/* TO SYNC OUR DATABASE TO ALL THE MODELS */
db.sequelize.sync();

/* GET ALL THE TWEETS OF A USER */
router.get("/:userid", async(req,res,next)=>{
    let userid = req.params.userid;
    let tweets = await db.tweet.findAll({where: {user_id: userid}});

    res.json({tweets});
});

/* ADD A TWEET INTO THE DATABASE */
router.post("/", uploader.single('media'), async(req,res,next)=>{
    
    let tweet = {...req.body};
    tweet.userid = req.session.userid;
    tweet.twtext = req.body.tweettext;
    if(req.file && req.file.path)tweet.media=req.file.path;
    console.log(tweet.userid);
    const tweetPosted = await db.tweet.create(tweet);
    res.json({tweetPosted});
})

module.exports = router;