const mongoose = require('mongoose');

const TranslationSchema = new mongoose.Schema({
  language: {
    type: String,
    required: true,
    unique: true,
  },
  filePath: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Translation', TranslationSchema);
