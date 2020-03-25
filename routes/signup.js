const express = require('express');
const router = express.Router();
const User = require("../models/User")
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


router.get('/signup', (req, res) => {
  res.render('user/signup');
});

router.post("/signup", (req, res, next) => {
  const { username, password , email ,firstName,lastName } = req.body;
  User.findOne({ "username": username })
    .then((user) => {
      if (user !== null) {
        next("The username already exists!");
      }
      else {
        bcrypt.hash(password, 10, function (err, hash) {
          if (err) next("Hashing error", err)
          else {
            User.create({
              username: username,
              password: hash,
              email:email,
              firstName:firstName,
              lastName:lastName
            })
              .then((user) => {
                res.redirect("/login")
              })
              .catch((error) => {
                res.send("Error user not created", error)
              })
          }
        })
      }
    })
});


router.get("/username-exists/:username",(req,res)=>{
  User.findOne({username: req.params.username})
  .then((user)=>{
    if(user)res.json({exists:true})
    else res.json({exists:false})
  })
  .catch((error)=>{
    res.json({error: error.message});
  })
})

module.exports = router;