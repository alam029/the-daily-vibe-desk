const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  getUserSavedArticles,
  saveSummary,
  deleteSummary,
} = require('../controllers/user.controller');

router.get('/saved', authMiddleware, getUserSavedArticles);
router.post('/saved', authMiddleware, saveSummary);
router.delete('/saved/:id', authMiddleware, deleteSummary);

module.exports = router;
