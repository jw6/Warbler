const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profileImageUrl: {
    type: String
  }
});

// hashing password
userSchema.pre("save", async function(next) {
  try {
    if(!this.isModified("password")) {
      return next();
    }
    // result of bcrypt hash
    let hashedPassword = bcrypt.hash(this.password, 10);
  } catch(err) {

  }
})

const User = mongoose.model("User", userSchema);

module.exports = User;