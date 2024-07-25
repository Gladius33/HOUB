import { Schema, model } from 'mongoose';

const ChatSchema = new Schema({
  employer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  freelancer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  job: {
    type: Schema.Types.ObjectId,
    ref: 'Job'
  },
  messages: [{
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    text: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
  status: {
    type: String,
    default: 'Active'
  }
}, { timestamps: true });

export default model('Chat', ChatSchema);
