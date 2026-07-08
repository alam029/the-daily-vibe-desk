const mongoose = require('mongoose');

const SavedArticleSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  articleId: { type: String, required: true },
  title: { type: String },
  source: { type: String },
  url: { type: String },
  urlToImage: { type: String },
  summary: { type: String, required: true },
  savedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('SavedArticle', SavedArticleSchema);
