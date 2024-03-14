// end point/route : employee router will accepts all the requests
var express = require("express");
var router = express.Router();
const db = require("../models"); // complete database
const { where } = require("sequelize");

// can use here as well
db.employee.sync();

/* GET users listing. */
// Created 4 end points to shift from hardcoded to softcoded
// localhost:3000/employees/104
router.get("/:id", async function (req, res, next) {
  const empId = req.params.id; // stores the entered id in teh empId variable
  const emp = await db.employee.findAll({ where: { empid: empId } });
  res.send(emp);
});
router.post("/create", async (req, res, next) => {
  const emp = req.body;
  let savedemp = await db.employee.create(emp);
  res.send(savedemp);
});
router.put("/update", async (req, res, next) => {
  const emp = req.body;
  res.send(savedemp);
});
router.delete("/:id", async function (req, res, next) {
  const emp = req.params.id;
  await db.employee.destroy({ where: { empId: emp } });
  res.send("deleted");
});

// Hard Coded
router.get("/", async function (req, res, next) {
  var emps = await db.employee.findAll({
    // hard coded
    where: { empid: 102 },
  });
  console.log("from db : ", emps);
  res.send(emps);
  //   res.send("respond with a resource of type employee");
});
// html-> only get and post request and other using postman or thunder. (either write js code)
router.post("/", async (req, res, next) => {
  let emp = {
    name: "Mr. Dinesh",
    email: "ogdineshsir@gmail.com",
    gender: "Male",
  };
  let savedemp = await db.employee.create(emp);
  res.send(savedemp);
});

router.delete("/", async (req, res, next) => {
  await db.employee.destroy({ where: { empid: 102 } });
  res.send("deleted successfully");
});

router.put("/", async (req, res, next) => {
  let updated = await db.employee.update(
    { email: "defender@gmail.com" },
    { where: { empid: 104 } }
  );
  res.send(updated);
});
module.exports = router;
// router.post("/",async (req,res,next)=>{
//   let emp= {
//     name: "Abhishek",
//     email : "abhishek@gmail.com",
//     gender : "Male"
//   }
//   let savedemp=await db.employee.create(emp);
//   res.send(savedemp);
// });
// router.delete("/",async (req,res,next)=>{
//   await db.employee.destroy({ where : {empid:2}});
//   res.send('deleted successfully');
// })
// router.put("/",async (req,res,next)=>{
//   let updated=await db.employee.update({email : 'chirag2235@gmail.com'},{where :{empid:101}});
//   res.send(updated);
// })
module.exports = router;