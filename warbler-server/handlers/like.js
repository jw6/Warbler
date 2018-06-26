const db = require("../models");

// api/users/:id/messages/:message_id/like
exports.createLike = async function(req, res, next) {
  try {
    let like = await db.Like.create({
      messageID:req.params.message_id,
      userID:req.params.id
    });
    Message.findByIdAndUpdate(this.messageID, { $inc: { likeCount: 1 }}, function(err, foundMessage) {
      if (err) next(err);
      return res.status(200).json(foundMessage);
    });
  } catch (error) {
    return next(error);
  }
}

// api/users/:id/messages/:message_id/unlike
exports.deleteLike = async function (req, res, next) {
  try {
    let foundLike = await db.Like.find({messageID:req.params.message_id, userID:req.params.id});
    // let foundMessage = await db.Message.findByIdRemove(req.params.message_id);
    await foundLike.remove();
    return res.status(200).json(foundLike);
  } catch (err) {
    return next(err);
  }
};