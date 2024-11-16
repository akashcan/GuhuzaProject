const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'skillmaster1017@gmail.com',
        pass: 'berh cgtz gajq feof'
    }
});

module.exports = transporter;
