const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const port = process.env.PORT || 3001;

const userRoute = require("./routes/users.routes");
const messageRoute = require("./routes/message.routes");

const server = express();

server.use(cors());
server.use(bodyParser.json());
server.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

server.use(express.json());

mongoose
  .connect(
    "mongodb+srv://WebHT_database_user1:waNZiYCBFMx5MDv8@webhtcluster.bdxcz.mongodb.net/WebHT?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => console.log("Unable to connect to database"));

server.use(
  morgan("INFO: :method :url :status", {
    skip: (req) => /^\/favicon.ico/.test(req.originalUrl),
  }),
);

server.use("/api/users", userRoute);
server.use("/api/messages", messageRoute);

/*
server.use("*", (req, res) => {
  res.sendFile(__dirname + "/client/build/index.html");
});
*/

server.listen(port, (err) => {
  if (err) throw err;
  console.log(`> Running on http://localhost:${port}`);
});
