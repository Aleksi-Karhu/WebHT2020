const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  users: { type: Array },
  message: { type: Array },
});

const messageModel = mongoose.model("Message", MessageSchema);

module.exports = messageModel;
