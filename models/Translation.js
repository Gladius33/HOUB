import { Schema, model } from 'mongoose';

const TranslationSchema = new Schema({
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

export default model('Translation', TranslationSchema);
