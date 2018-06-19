require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./handlers/error");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/message");
const { loginRequired, ensureCorrectUser } = require("./middleware/auth");
const db = require("./models");
const PORT = 8081;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use(
  "/api/users/:id/messages",
  loginRequired,          // make sure you're login
  ensureCorrectUser,      // make sure you're the correct user 
  messageRoutes
);

app.get("/api/messages/:username", loginRequired, async function (req, res, next) {
  try {
    let messages = await db.Message.find()
      .sort({ createdAt: "desc" })
      .populate("user", {
        username: true,
        profileImageUrl: true
      });
    // return res.status(200).json(messages);

    return res.status(200).json(messages.filter(message => message.user.username === req.params.username));
  } catch (err) {
    return next(err);
  }
});


// filter specific message by username
app.get("/api/messages/user/:username", loginRequired, async function (req, res, next) {
  try {
    let messages = await db.Message.findByUsername(req.params.username, function(err, user) {
      if(err) {
        res.send(err)
      }
      res.json(messages);
    })
      .sort({ createdAt: "desc" })
      .populate("user", {
        username: true,
        profileImageUrl: true
      });
    // return res.status(200).json(messages);

    // filter message by username 
    return res.status(200).json(messages.filter(message => message.user.username === req.params.username));
  } catch (err) {
    return next(err);
  }
});

app.use(function (req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, function () {
  console.log(`Server is starting on port ${PORT}`);
});
