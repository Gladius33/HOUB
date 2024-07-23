const mongoose = require('mongoose');

const EmployerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
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

module.exports = mongoose.model('employer', EmployerSchema);
