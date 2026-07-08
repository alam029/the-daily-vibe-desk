const express = require('express');
const router = express.Router();
const { summarizeArticle } = require('../controllers/summarizer.controller');

router.post('/', summarizeArticle);

module.exports = router;
