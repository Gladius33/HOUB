const mongoose = require('mongoose');
const { Schema, model } = mongoose;


const CurrencySchema = new Schema({
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

export default model('Currency', CurrencySchema);

