const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Akash354@$*#',
    database: 'guhuzagamedb'
});

module.exports = db;
