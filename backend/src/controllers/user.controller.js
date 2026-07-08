const SavedArticle = require('../models/savedArticle.model');
const User = require('../models/user.model');

exports.getUserSavedArticles = async (req, res) => {
  try {
    const saved = await SavedArticle.find({ userId: req.user.id }).sort({ savedAt: -1 });
    res.json({ saved });
  } catch (err) {
    console.error('[getUserSavedArticles]', err.message);
    res.status(500).json({ error: 'Could not load your saved summaries.' });
  }
};

exports.saveSummary = async (req, res) => {
  try {
    const { articleId, title, source, url, urlToImage, summary } = req.body;
    if (!articleId || !summary) {
      return res.status(400).json({ error: 'articleId and summary are required' });
    }

    const saved = await SavedArticle.create({
      userId: req.user.id,
      articleId,
      title,
      source,
      url,
      urlToImage,
      summary,
      savedAt: new Date(),
    });

    await User.findByIdAndUpdate(req.user.id, { $push: { savedArticles: saved._id } });

    res.status(201).json({ saved });
  } catch (err) {
    console.error('[saveSummary]', err.message);
    res.status(500).json({ error: 'Could not save this summary.' });
  }
};

exports.deleteSummary = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await SavedArticle.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!doc) return res.status(404).json({ error: 'Saved summary not found' });
    res.json({ deleted: true });
  } catch (err) {
    console.error('[deleteSummary]', err.message);
    res.status(500).json({ error: 'Could not delete this summary.' });
  }
};
