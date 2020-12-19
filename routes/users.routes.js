const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const router = express.Router();

router.get("/users", async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

router.post("/signin", async (req, res) => {
  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });
  if (user) {
    res.send(user);
  } else {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });
    const newUser = await user.save();
    if (newUser) {
      res.send(newUser);
    }
  }
});

module.exports = router;
