import pkg from 'mongoose';
const { Schema, model } = pkg;

const currencySchema = new Schema({
  USD: {
    type: Number
  },
  EUR: {
    type: Number
  },
  GBP: {
    type: Number
  },
 
}, { timestamps: true });

const Currency = model('Currency', currencySchema);

export default Currency;


