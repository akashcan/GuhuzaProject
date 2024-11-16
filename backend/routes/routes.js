const express = require('express');
const { register, login } = require('../controllers/authController');
const multer = require('multer');
const authController = require('../controllers/authController');
const path = require('path');
const router = express.Router();


// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = file.fieldname === "profile-picture" ? './uploads/profile-pictures' : './uploads/resumes';
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post('/register', upload.fields([{ name: 'profile-picture' }, { name: 'resume' }]), register);
router.post('/login', login);
router.post('/verify-otp', authController.verifyOtp);
router.get('/user-details', authController.getUserDetails);


module.exports = router;
