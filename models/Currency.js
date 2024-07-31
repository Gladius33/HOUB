import pkg from 'mongoose';
const { Schema, model } = pkg;

const CurrencySchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    minlength: 3,
    maxlength: 5,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['fiat', 'crypto'],
  },
  symbol: {
    type: String,
    required: true,
  },
  exchangeRates: {
    EUR: {
      type: Number,
      required: true,
      default: 0,
    },
    BTC: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  decimals: {
    type: Number,
    default: function() {
      return this.type === 'crypto' ? 8 : 2;
    }
  }
}, { timestamps: true });

export default model('Currency', CurrencySchema);
