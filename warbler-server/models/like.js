const mongoose = require('mongoose')
const User = require('./user')

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

const Like = mongoose.model('Like', likeSchema)
module.exports = Like
