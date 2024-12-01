const express = require('express');
const { getLeaderboard } = require('../controllers/leaderboardController');
const router = express.Router();

// Define the leaderboard route
router.get('/leaderboard', getLeaderboard);

module.exports = router;
