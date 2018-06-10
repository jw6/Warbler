const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect("mongodb://admin:p4ssw0rd@ds255320.mlab.com:55320/smalldb", {
  keepAlive: true
});

module.exports.User = require("./user");
module.exports.Message = require("./message");

//mongodb://localhost:37017/warbler