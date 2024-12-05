const db = require('../config/db');

exports.getLeaderboard = (req, res) => {
    const limit = 20; // Adjust the number of players to show on the leaderboard

    const query = `
        SELECT 
            js.JobSeekerID,  -- Include JobSeekerID in the result
            js.FullName, 
            js.ProfilePicture,
            COALESCE(SUM(qr.TotalXP), 0) AS TotalXP -- Handle cases with no points
        FROM jobseekers js
        LEFT JOIN quizresults qr ON js.JobSeekerID = qr.JobSeekerID
        GROUP BY js.JobSeekerID, js.FullName, js.ProfilePicture
        ORDER BY TotalXP DESC
        LIMIT ?;
    `;

    db.query(query, [limit], (err, results) => {
        if (err) {
            console.error("Error fetching leaderboard data:", err);
            return res.status(500).json({ message: "Failed to fetch leaderboard data." });
        }

        res.status(200).json(results);
    });
};
