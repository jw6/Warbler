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
  // before saving the password, use bcrypt to hash it
  try {
    if(!this.isModified("password")) {
      return next();
    }
    // result of bcrypt hash, salt round is 10
    let hashedPassword = bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next();
  } catch(err) {
    return next(err);
  }
});

// use compare method to make sure user put in the right password
userSchema.method.comparePassowrd = async function(candidatePassword, next){
  try {
    let isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (error) {
    return next(error); 
  }
}; 

const User = mongoose.model("User", userSchema);

module.exports = User;