const express = require('express');
const { register, login } = require('../controllers/authController');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const authController = require('../controllers/authController');
const profileController = require('../controllers/profileController');

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = file.fieldname === "profile-picture"
            ? './uploads/profile-pictures'
            : './uploads/resumes';

        // Ensure the folder exists
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder, { recursive: true });
        }

        cb(null, folder);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Invalid file type. Only JPEG, PNG, and PDF are allowed.'));
        }
        cb(null, true);
    },
    limits: { fileSize: 5 * 1024 * 1024 } // 5 MB
});

// Define Routes
router.post('/register', (req, res, next) => {
    upload.fields([{ name: 'profile-picture' }, { name: 'resume' }])(req, res, function (err) {
        if (err) {
            console.error('Multer Error:', err);
            return res.status(400).json({ message: 'File upload error', error: err.message });
        }
        next();
    });
}, async (req, res) => {
    try {
        await register(req, res); // Call the controller
    } catch (err) {
        console.error('Registration Error:', err);
        res.status(500).json({ message: 'An error occurred during registration', error: err.message });
    }
});

router.post('/login', login);
router.post('/verify-otp', authController.verifyOtp);
router.get('/user-details', authController.getUserDetails);
router.get('/profile', profileController.getProfile);

module.exports = router;
