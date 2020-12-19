const express = require("express");
const Message = require("../models/messageModel");
const router = express.Router();

router.post("/message", async (req, res) => {
  const message = await Message.find({});
  const msg = message.find(
    (x) =>
      x.users[0] === req.body.users[0] ||
      (x.users[0] === req.body.users[1] && x.users[1] === req.body.users[0]) ||
      x.users[1] === req.body.users[1],
  );
  msg ? res.send(msg) : res.send(undefined);
});

router.post("/newmessage", async (req, res) => {
  const message = new Message({
    users: req.body.users,
    message: req.body.message,
  });
  const newMessage = await message.save();
  if (newMessage) {
    res.send(newMessage);
  } else {
    res.send("error");
  }
});

router.put("/sendmessage/:id", async (req, res) => {
  const message = await Message.findById(req.params.id);
  console.log(req.body.message);
  if (message) {
    message.message = [req.body.message, ...message.message];
    const newMessage = await message.save();
    newMessage && res.send(newMessage);
  }
});

module.exports = router;
