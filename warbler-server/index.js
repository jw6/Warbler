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

app.get("/api/messages", loginRequired, async function(req, res, next) {
  try {
    let messages = await db.Message.find()
    .sort({ createdAt: "desc" })
    .populate("user", {
      username: true,
      profileImageUrl: true
    });
    return res.status(200).json(messages);
  } catch (error) {
    return next(error);
  }
})

app.use(function (req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, function () {
  console.log(`Server is starting on port ${PORT}`);
});
