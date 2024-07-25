import { Schema, model } from 'mongoose';

const JobSchema = new Schema({
  employer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
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
  onsiteAddress: {
    type: String
  },
  workingHours: {
    type: String
  },
  companyName: {
    type: String,
    required: true
  },
  companyLogo: {
    type: String
  },
  shortDescription: {
    type: String
  },
  detailedDescription: {
    type: String
  },
  sector: {
    type: String
  },
  city: {
    type: String
  },
  region: {
    type: String
  },
  country: {
    type: String,
    required: true
  },
  applications: [{
    freelancer: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      default: 'Pending'
    }
  }],
  status: {
    type: String,
    default: 'Open'
  },
  notifications: [{
    message: String,
    date: {
      type: Date,
      default: Date.now
    }
  }]
}, { timestamps: true });

export default model('Job', JobSchema);
