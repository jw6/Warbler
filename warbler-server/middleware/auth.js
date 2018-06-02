require('dotenv').load();
var jwt = require("jsonwebtoken");

// make sure the user is logged - Authentication
exports.loginRequired = function(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Bears token
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
      if(decoded) {
        next();
      } else {
        return next({
          status: 401,
          message: "Please log in first"
        });
      }
    })
  } catch (error) {
    return next({
      status: 401,
      message: "Please log in first"
    });
  }
}

// make sure we get the correct user - Authorization
exports.ensureCorrectUser = function(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
      if(decoded && decoded.id === req.params.id) {
        return next();
      } else {
        return next({
          status: 401,
          message: "Unauthorized"
        })
      }
    });
  } catch (e) {
    return next({
          status: 401,
          message: "Unauthorized"
    })
  }
}
