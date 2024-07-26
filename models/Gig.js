import pkg from 'mongoose';
const { Schema, model } = pkg;

const GigSchema = new Schema({
  employer: {
    type: Schema.Types.ObjectId,
    ref: 'employer'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  maxDailyRate: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  remote: {
    type: Boolean,
    required: true
  },
  location: {
    type: String
  },
  status: {
    type: String,
    enum: ['open', 'closed'],
    default: 'open'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default model('gig', GigSchema);
