const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  title: { type: String, minLength: 10, maxLength: 50, required: true },
  content: { type: String, minLength: 20, maxLength: 1000, required: true },
  publishDate: { type: Date, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  location: { type: String, required: true },
  seller: { type: String, required: true },
});

module.exports = mongoose.model('Ad', adSchema);
