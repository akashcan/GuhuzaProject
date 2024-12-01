const bcrypt = require('bcryptjs');
const db = require('../config/db');
const transporter = require('../config/mailer');
const { generateOTP } = require('../utils/utils');

// Registration Logic
exports.register = (req, res) => {
    try {
        const { 'full-name': fullName, email, password, skills, 'location': address } = req.body;
        const profilePicture = req.files?.['profile-picture']?.[0]?.filename;
        const resume = req.files?.['resume']?.[0]?.filename;

        // Validate required fields
        if (!fullName || !email || !password || !skills || !address || !profilePicture || !resume) {
            return res.status(400).json({ message: 'Please fill all fields and upload both files.' });
        }

        // Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        // Prepare the query
        const query = `INSERT INTO jobseekers (fullname, email, password, skills, profilepicture, resume, address) VALUES (?, ?, ?, ?, ?, ?, ?)`;

        // Execute the query
        db.query(query, [fullName, email, hashedPassword, skills, profilePicture, resume, address], (err, result) => {
            if (err) {
                console.error('Database Error:', err);
                return res.status(500).json({ message: 'Error registering user', error: err });
            }

            const jobSeekerID = result.insertId; // Get the JobSeekerID from the database

            // Send Registration Email
            const mailOptions = {
                from: '"SkillMaster" <skillmaster1017@gmail.com>',
                to: email,
                subject: 'Welcome to Skill Master – Registration Successful',
                html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.2; color: #333; max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
                    <h2 style="color: #0f4c81;">Welcome to Skill Master, ${fullName}! 👋</h2>
                    <p>Thank you for joining <strong>Skill Master</strong>. We’re excited to have you with us as you take the next step in your professional journey.</p>
                    <p>Feel free to explore and start enhancing your skills right away. We're here to support you at every step.</p>
                    <p>Need help? Reach out anytime at <a href="mailto:support@skillmaster.com" style="color: #0f4c81; text-decoration: none;">Support Team</a>.</p>
                    <p>Best regards,</p>
                    <p><strong style="color:#0f4c81">Skill Master Team</strong></p>
                    <footer style="background-color:#333; border-radius: 5px; margin-top: 20px; padding: 5px; border-top: 1px solid #eaeaea; font-size: 12px; color: #fff; text-align: center; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
                        <p>This email was sent from Skill Master, 740 Bathrust St, Toronto, ON.</p>
                        <p>You are receiving this email because you registered on our platform.</p>
                    </footer>
                </div>
                `,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Email Error:', error);
                    return res.status(200).json({
                        message: 'User registered successfully, but failed to send email.',
                        JobSeekerID: jobSeekerID
                    });
                }

                // Success response
                res.status(200).json({
                    message: 'User registered successfully. Registration email sent.',
                    JobSeekerID: jobSeekerID
                });
            });
        });
    } catch (error) {
        console.error('Unexpected Error:', error);
        res.status(500).json({ message: 'An unexpected error occurred', error });
    }
};


// Login Logic with OTP Generation
exports.login = (req, res) => {
    const { email, password } = req.body;
    console.log("Received login request for email:", email);

    db.query("SELECT * FROM jobseekers WHERE email = ?", [email], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: 'Server error' });
        }

        if (results.length === 0) {
            console.warn("No user found with the provided email.");
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const user = results[0];

        // Log the retrieved user data to inspect what's coming from the database
        console.log("Retrieved user from jobseekers:", user);

        // Make sure the password field is correctly referenced
        if (!user.Password) {
            console.error('Password not found in the database for the provided email.');
            return res.status(500).json({ message: 'Password not found in the database.' });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = bcrypt.compareSync(password, user.Password);

        if (!isPasswordValid) {
            console.warn("Incorrect password provided.");
            return res.status(400).json({ message: 'Invalid email or password' });
        }


        // Generate and send OTP
        const otp = generateOTP();
        db.query("UPDATE jobseekers SET otp = ? WHERE email = ?", [otp, email], (err) => {
            if (err) return res.status(500).json({ message: 'Server error' });

            const fullName = user.FullName;

            // Send OTP via email
            const mailOptions = {
                from: '"SkillMaster" <skillmaster1017@gmail.com>',
                to: email,
                subject: 'Your Skill Master Login OTP',
                html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.2; color: #333; max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
                <h2 style="color: #0f4c81;">Hi, ${fullName}!👋</h2>
                    <p>Your OTP is: <strong>${otp}</strong></p>
                    <p>Use this OTP to complete your login process on Skill Master.</p>
                    <p>If you did not request this, please contact our support team.</p>
                <p>Best regards,</p>
                <p><strong style="color:#0f4c81">Skill Master Team</strong></p>

                <footer style="background-color:#333;border-radius: 5px; margin-top: 20px; padding: 5px; border-top: 1px solid #eaeaea; font-size: 12px; color: #fff; text-align: center; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
                    <p>This email was sent from Skill Master, 740 Bathrust St, Toronto, ON.</p>
                    <p>You are receiving this email because you registered on our platform.</p>
                </footer>
            </div>`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return res.status(500).json({ message: 'Failed to send OTP' });
                }
                return res.status(200).json({ message: 'OTP sent to your email', JobSeekerID: user.JobSeekerID, });
            });
        });
    }
)};

// Additional endpoint for OTP Verification
exports.verifyOtp = (req, res) => {
    const { email, otp } = req.body;

    db.query("SELECT * FROM jobseekers WHERE email = ? AND otp = ?", [email, otp], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: 'Server error' });
        }

        if (results.length === 0) {
            return res.status(400).json({ message: 'Invalid OTP. Please try again.' });
        }

 // Get the user's full name from the results
     const fullName = results[0].FullName;

        // Clear the OTP after successful login
        db.query("UPDATE jobseekers SET otp = NULL WHERE email = ?", [email], (err) => {
            if (err) {
                console.error("Database error while clearing OTP:", err);
                return res.status(500).json({ message: 'Server error' });
            }

            res.status(200).json({ message: 'OTP verified successfully! Logging in...', fullName });
        });
    });
};

// Endpoint to Get User Details
exports.getUserDetails = (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ message: 'Email is required to fetch user details.' });
    }

    db.query("SELECT FullName FROM jobseekers WHERE Email = ?", [email], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: 'Server error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = results[0];
        return res.status(200).json({ fullName: user.FullName });
    });
};



