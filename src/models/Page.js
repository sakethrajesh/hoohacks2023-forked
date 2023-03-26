const mongoose = require('mongoose');

const PageSchema = new mongoose.Schema({
  pageNumber: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  associatedSentences: [
    {
      type: String,
      required: true,
    },
  ],
});

module.exports = mongoose.models.Page || mongoose.model('Page', PageSchema);