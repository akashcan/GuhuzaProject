const db = require('../config/db');

exports.getLeaderboard = (req, res) => {
    const limit = 10; // Adjust limit to the number of players you want to show

    const query = `
        SELECT 
            js.FullName, 
            js.ProfilePicture, 
            SUM(qr.XpEarned) AS TotalXP
        FROM quizresults qr
        JOIN jobseekers js ON qr.JobSeekerID = js.JobSeekerID
        GROUP BY qr.JobSeekerID
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
