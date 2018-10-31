const mongoose = require('mongoose')
const User = require('./user')
const message = required("./message")

const likeSchema = new mongoose.Schema(
  {
    like: {
      type: Boolean,
      requried: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    message: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message'
    }
  },
    {
      timestamp: true
    }
)

likeSchema.pre('remove', async function (next) {
  let user = await Like.findById(this.user)

})

likeSchema.pre("save", function(next) {
  message.findByIdAndUpdate(this.messageId, { $inc: {likeCount: -1}}, funcion(err, message) {
    if (err) {
      next(err)
    }
    next()
  })
})

const Like = mongoose.model('Like', likeSchema)
module.exports = Like
