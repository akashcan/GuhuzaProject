function generateOTP() {
    return Math.floor(100000000 + Math.random() * 900000000); // 9-digit OTP
}

module.exports = { generateOTP };
