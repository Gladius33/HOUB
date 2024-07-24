const mongoose = require('mongoose');
const { Schema, model } = mongoose;


const Currency = new Schema({
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

    return mongoose.Model

module.exports = Currency();

