const db = require('../config/db');

exports.submitQuizResults = (req, res) => {
    const { JobSeekerID, GroupCollection, CorrectAnswers, TotalQuestions, TimeTaken } = req.body;

    // Validate required fields
    if (!JobSeekerID || !GroupCollection || !CorrectAnswers || !TotalQuestions || !TimeTaken) {
        return res.status(400).json({ message: "All fields are required to submit quiz results." });
    }

    // XP Calculation Formula
    const Base_XP_Per_Question = 10;
    const Time_Bonus_Per_Question = TimeTaken < 10 ? 5 : 0; // Bonus for quick answers
    const Level_Completion_Bonus = 50; // Fixed bonus for completing the group
    const Accuracy_Bonus_Percentage = (CorrectAnswers / TotalQuestions) >= 0.8 ? 0.1 : 0;

    const Accuracy_Bonus = (CorrectAnswers * Base_XP_Per_Question) * Accuracy_Bonus_Percentage;
    const TotalXP = Math.round(
        (CorrectAnswers * Base_XP_Per_Question) +
        (Time_Bonus_Per_Question * CorrectAnswers) +
        Level_Completion_Bonus +
        Accuracy_Bonus
    );

    console.log(`Total XP Earned: ${TotalXP}`);

    // Insert quiz result into the database
    const insertQuery = `
        INSERT INTO quizresults (JobSeekerID, GroupCollection, CorrectAnswers, TimeTaken, TotalXP, PlayedAt)
        VALUES (?, ?, ?, ?, ?, NOW())
    `;

    db.query(insertQuery, [JobSeekerID, GroupCollection, CorrectAnswers, TimeTaken, TotalXP], (err, result) => {
        if (err) {
            console.error("Database error while inserting quiz results:", err);
            return res.status(500).json({ message: 'Failed to submit quiz results.' });
        }

        // Update or Insert into the leaderboard table
        const updateLeaderboardQuery = `
            INSERT INTO leaderboard (JobSeekerID, FullName, TotalXP)
            VALUES (?, 
                (SELECT FullName FROM jobseekers WHERE JobSeekerID = ?), 
                ?
            )
            ON DUPLICATE KEY UPDATE 
                TotalXP = TotalXP + VALUES(TotalXP)
        `;

        db.query(updateLeaderboardQuery, [JobSeekerID, JobSeekerID, TotalXP], (err, result) => {
            if (err) {
                console.error("Database error while updating leaderboard:", err);
                return res.status(500).json({ message: 'Failed to update leaderboard.' });
            }

            res.status(200).json({ message: 'Quiz results submitted successfully.', totalXP: TotalXP });
        });
    });
};
