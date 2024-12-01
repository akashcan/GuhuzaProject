const db = require('../config/db');

// Get user profile details
exports.getProfile = (req, res) => {
    const { email } = req.query;

    console.log('Received request for profile with email:', email);

    if (!email) {
        return res.status(400).json({ message: 'Email is required to fetch profile details' });
    }

    const query = "SELECT FullName, Email, Password, JoinDate FROM jobseekers WHERE Email = ?";
    db.query(query, [email], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (results.length === 0) {
            console.warn('No user found with the given email:', email);
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('Profile data retrieved from DB:', results[0]); // Debug log
        return res.status(200).json(results[0]);
    });
};
