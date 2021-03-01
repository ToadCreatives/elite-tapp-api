const mongoose = require('mongoose');

const { Schema } = mongoose;
const crypto = require('crypto');

const refreshTokenSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: false,
});

refreshTokenSchema.statics.generate = async function generate(user) {
  const userId = user._id;

  // check if user already has a issued token
  const prevToken = await this.findOne({ user: userId });
  if (prevToken) {
    return prevToken.token;
  }

  // remove previous token and issue new
  await this.findOneAndDelete({ user: userId });
  const token = `${userId}.${crypto.randomBytes(64).toString('hex')}`;

  const tokenObject = new this({
    token,
    user: userId,
  });
  await tokenObject.save();
  return token;
};

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);
module.exports = RefreshToken;
