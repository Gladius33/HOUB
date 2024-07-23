const mongoose = require('mongoose');

const GigSchema = new mongoose.Schema({
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'employer'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  maxDailyRate: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  remote: {
    type: Boolean,
    required: true
  },
  location: {
    type: String
  },
  status: {
    type: String,
    enum: ['open', 'closed'],
    default: 'open'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('gig', GigSchema);
