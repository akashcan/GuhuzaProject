const express = require('express');
const { submitQuizResults } = require('../controllers/quizController');
const router = express.Router();

// Route to submit quiz results
router.post('/submit-quiz', submitQuizResults);

module.exports = router;
