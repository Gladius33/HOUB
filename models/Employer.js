import { Schema, model } from 'mongoose';

const EmployerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  companyName: {
    type: String,
    required: true
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
  location: {
    type: String
  },
  logo: {
    type: String
  }
});

export default model('employer', EmployerSchema);
