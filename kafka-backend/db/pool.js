var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 100,
    port: '3306',
    host: 'http://ec2-3-16-163-109.us-east-2.compute.amazonaws.com',
    user: 'root',
    password: 'admin',
    database: 'LinkedIn'
});

module.exports = pool;