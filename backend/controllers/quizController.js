const db = require('../config/db');

exports.submitQuizResults = (req, res) => {
    const { JobSeekerID, LevelName, Difficulty, CorrectAnswers, TotalQuestions, TimeTaken } = req.body;

    if (!JobSeekerID || !LevelName || !Difficulty || !CorrectAnswers || !TotalQuestions || !TimeTaken) {
        return res.status(400).json({ message: "All fields are required to submit quiz results." });
    }

    // XP Calculation Formula
    const Base_XP_Per_Question = 10;
    const Time_Bonus_Per_Question = TimeTaken < 10 ? 5 : 0; // Bonus for quick answers
    const Level_Completion_Bonus = 50; // Fixed bonus for completing the level
    const Accuracy_Bonus_Percentage = (CorrectAnswers / TotalQuestions) >= 0.8 ? 0.1 : 0;

    const Accuracy_Bonus = (CorrectAnswers * Base_XP_Per_Question) * Accuracy_Bonus_Percentage;
    const XpEarned = Math.round(
        (CorrectAnswers * Base_XP_Per_Question) +
        (Time_Bonus_Per_Question * CorrectAnswers) +
        Level_Completion_Bonus +
        Accuracy_Bonus
    );

    console.log(`XP Earned: ${XpEarned}`);

    // Insert quiz result into the database
    const insertQuery = `
        INSERT INTO quizresults (JobSeekerID, LevelName, Difficulty, CorrectAnswers, TimeTaken, XpEarned, PlayedAt)
        VALUES (?, ?, ?, ?, ?, ?, NOW())
    `;

    db.query(insertQuery, [JobSeekerID, LevelName, Difficulty, CorrectAnswers, TimeTaken, XpEarned], (err, result) => {
        if (err) {
            console.error("Database error while inserting quiz results:", err);
            return res.status(500).json({ message: 'Failed to submit quiz results.' });
        }

        // Update total XP in jobseekers table
        const updateQuery = `
            UPDATE jobseekers SET totalXp = totalXp + ? WHERE JobSeekerID = ?
        `;

        db.query(updateQuery, [XpEarned, JobSeekerID], (err, result) => {
            if (err) {
                console.error("Database error while updating total XP:", err);
                return res.status(500).json({ message: 'Failed to update total XP.' });
            }

            res.status(200).json({ message: 'Quiz results submitted successfully.', xpEarned: XpEarned });
        });
    });
};
