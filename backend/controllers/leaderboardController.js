const db = require('../config/db');

exports.getLeaderboard = (req, res) => {
    const limit = 20; // Adjust the number of players to show on the leaderboard

const query = `
    SELECT 
        lb.JobSeekerID,
        lb.FullName,
        lb.TotalXP
    FROM leaderboard lb
    ORDER BY lb.TotalXP DESC
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
