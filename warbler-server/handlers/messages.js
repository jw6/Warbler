const db = require("../models");

// api/users/:id/meessages/
exports.createMessage = async function(req, res, next) {
  try {
    let message = await db.Message.create({
      text: req.body.text,
      user: req.params.id
    });
    let foundUser = await db.User.findById(req.params.id);
    foundUser.messages.push(message.id);
    await foundUser.save();
    let foundMessage = await db.Message.findById(message._id).populate("user", {
      username: true,
      profileImageUrl: true
    });
    return res.status(200).json(foundMessage);
  } catch (error) {
    return next(error);
  }
}

// api/users/:id/messages/:message_id
exports.getMessage = async function (req, res, next) {
  try {
    let message = await db.Message.findById(req.params.message_id);
    return res.status(200).json(message);
  } catch (err) {
    return next(err);
  }
};

// api/users/:id/messages/:message_id
exports.deleteMessage = async function(req, res, next) {
  try {
    // findByIdAndRemove does not apply here since pre remove hook remove message by Id
    let foundMessage = await db.Message.findById(req.params.message_id);
    await foundMessage.remove();
    return res.status(200).json(foundMessage);
  } catch (error) {
    return next(error);
  }
}

// api/users/:id/messages/:message_id
exports.updateMessage = async function(req, res, next) {
  try {
    let updatedMessage = await db.Message.findByIdAndUpdate(
      req.params.message_id,
      {text : req.body.text}
    );
    await updatedMessage.save();
    return res.status(200).json(updatedMessage);
  } catch (error) {
    return next(error);
  }
}