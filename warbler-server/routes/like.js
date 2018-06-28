const express =require("express");
const router = express.Router({ mergeParams: true });

const { 
  createLike, 
  deleteLike
} = require("../handlers/like");

// prefix - /api/users/:id/messages/:message_id
router.route("/like").get(createMessage);
router.route("/unlike").get(deleteLike);

module.exports = router;
