const mongoose = require("mongoose");
const user = require("./user");

const messageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      mexLength: 160
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  }, 
  {
    timestamps: true
  }
);

// pre remove hook, that also remove message id in user if message is removed.
messageSchema.pre("remove", async function (next) {
  try {
    // find a user
    let user = await User.findById(this.user);
    // remove the id of the message from their messages list
    user.messages.remove(this.id);
    // save that user
    await user.save();
    // return next
    return next();
  } catch (err) {
    return next(err);
  }
});

messageSchema.statics.findByUsername = function (username, callback) {
  let query = this.findOne();

  user.findOne({ 'username': username, function(error, user) {
    query
    .where(
      {user: user._id} 
    )
    .exec(callback)
    }
  });
  return query;
}

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;