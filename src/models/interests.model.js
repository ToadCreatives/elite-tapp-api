const mongoose = require('mongoose');

const { Schema } = mongoose;

const interestSchema = new Schema({
  title: {
    type: String,
    unique: true,
  },
}, {
  timestamps: false,
});

module.exports = mongoose.model('Interest', interestSchema);
