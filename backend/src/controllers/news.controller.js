const axios = require('axios');

// GET /api/news?category=technology&q=keyword
exports.getNews = async (req, res) => {
  try {
    const { category, q } = req.query;

    const params = {
      apiKey: process.env.NEWS_API_KEY,
      language: 'en',
      pageSize: 20,
    };

    let url;
    if (q && q.trim()) {
      // Keyword search uses the /everything endpoint
      url = 'https://newsapi.org/v2/everything';
      params.q = q.trim();
      params.sortBy = 'publishedAt';
    } else {
      // Category browsing uses /top-headlines
      url = 'https://newsapi.org/v2/top-headlines';
      params.category = category || 'general';
      params.country = 'us';
    }

    const response = await axios.get(url, { params });
    const articles = (response.data.articles || []).map((a, idx) => ({
      id: a.url || `${idx}-${a.publishedAt}`,
      title: a.title,
      description: a.description,
      content: a.content,
      author: a.author,
      source: a.source?.name,
      url: a.url,
      urlToImage: a.urlToImage,
      publishedAt: a.publishedAt,
    }));

    res.json({ articles });
  } catch (err) {
    const status = err.response?.status || 500;
    const message =
      err.response?.data?.message || 'Could not fetch news right now. Please try again.';
    console.error('[getNews]', status, message);
    res.status(status).json({ error: message });
  }
};
