const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signin = function() {}

exports.signup = async function(req, res, next) {
  try {
    // create a user
    // create a token(signing a token)
    // process.env.SECRET_KEY
    let user = await db.User.create(req.body);
    // destructuing
    let{ id, username, profileImageUrl } = user;
    // jwt payload
    let token = jwt.sign({
      id,
      username,
      profileImageUrl
      },
      process.env.SECRET_KEY
    );
    return res.status(200).json({
      id,
      username,
      profileImageUrl,
      token
    })
  } catch (error) {
    // see what kind of error
    // if it is a certian error
    // respond with username/email already taken
    // otherwise just send back a generic 400
    // if a validation fails
    if(error.code == 11000) {
      error.message = "Sorry that usernmae and/or email is taken";
    }
    return next({
      status: 400,
      message: error.message
    })
  }
}
