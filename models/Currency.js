import mongoose, { Model } from 'mongoose';
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

    return Model

export default Currency();

