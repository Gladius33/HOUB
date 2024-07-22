const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  shortDescription: {
    type: String
  },
  detailedDescription: {
    type: String
  },
  education: [{
    institution: String,
    degree: String,
    fieldOfStudy: String,
    startDate: Date,
    endDate: Date
  }],
  experience: [{
    title: String,
    company: String,
    location: String,
    startDate: Date,
    endDate: Date,
    description: String
  }],
  dailyRateMin: {
    type: Number
  },
  dailyRateMax: {
    type: Number
  },
  maxDuration: {
    type: Number
  },
  minDuration: {
    type: Number
  },
  fullTime: {
    type: Boolean
  },
  partTime: {
    type: Boolean
  },
  remote: {
    type: Boolean
  },
  onsite: {
    type: Boolean
  },
  geoZone: {
    type: String
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
  },
  notifications: [{
    message: String,
    date: {
      type: Date,
      default: Date.now
    }
  }]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);

