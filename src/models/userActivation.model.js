const mongoose = require('mongoose');

const { Schema } = mongoose;

const userActivationSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
  },
  code: {
    type: String,
  },
  method: {
    type: String,
    enum: ['phone', 'email'],
  },
  expiresAt: {
    type: Date,
  },
}, {
  timestamps: false,
});

module.exports = mongoose.model('UserActivation', userActivationSchema);
