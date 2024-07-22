const mongoose = require('mongoose');

const CurrencySchema = new mongoose.Schema({
  USD: {
    type: Number
  },
  EUR: {
    type: Number
  },
  GBP: {
    type: Number
  },
  // Add more currencies as needed
}, { timestamps: true });

module.exports = mongoose.model('Currency', CurrencySchema);

