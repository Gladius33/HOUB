import pkg from 'mongoose';
const { Schema, model } = pkg;

const FreelanceSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
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

export default model('freelance', FreelanceSchema);
