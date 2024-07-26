import pkg from 'mongoose';
const { Schema, model } = pkg;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
});

export default model('Category', CategorySchema);
