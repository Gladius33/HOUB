const mongoose = require('mongoose');

const FreelanceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  shortDescription: {
    type: String
  },
  detailedDescription: {
    type: String
  },
  skills: {
    type: [String]
  },
  hourlyRate: {
    type: Number
  },
  minDuration: {
    type: Number
  },
  maxDuration: {
    type: Number
  },
  availability: {
    type: String,
    enum: ['full-time', 'part-time']
  },
  location: {
    type: String
  },
  remote: {
    type: Boolean
  },
  paymentInfo: {
    bankAccount: {
      type: String
    },
    btcWallet: {
      type: String
    },
    xmrWallet: {
      type: String
    }
  }
});

module.exports = mongoose.model('freelance', FreelanceSchema);
