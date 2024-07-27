import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const PaymentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    enum: ['USD', 'EUR', 'BTC', 'XMR'],
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ['credit_card', 'bank_transfer', 'btc', 'xmr'],
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

export default model('Payment', PaymentSchema);