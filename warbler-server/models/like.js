const mongoose = require("mongoose");
const user = require("./user");
const message = require("./message");

const likeSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: true
    },
    messageID: {
      type: String,
      required: true
    }
  }, 
  {
    timestamps: true
  }
);

userSchema.pre("remove", function (next) {
  Message.findByIdAndUpdate(this.messageID, { $inc: { likeCount: -1 }}, function(err, message) {
    if (err) next(err);
    next();
  });
});

const Like = mongoose.model("Like", likeSchema);
module.exports = Like;