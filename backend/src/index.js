require('dotenv').config();
require('./db')();

const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const newsRoutes = require('./routes/news.routes');
const summarizerRoutes = require('./routes/summarizer.routes');

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*' }));
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/summarize', summarizerRoutes);

// Fallback error handler
app.use((err, req, res, next) => {
  console.error('[Unhandled]', err);
  res.status(500).json({ error: 'Something went wrong on the server.' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`[Server] The Daily Wire Desk API running on port ${PORT}`));
