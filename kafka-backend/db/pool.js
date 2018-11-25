var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit : 1000,
    connectTimeout  : 60 * 60 * 1000,
    acquireTimeout   : 60 * 60 * 1000,
    timeout         : 60 * 60 * 1000,
    port: '3306',
    host: 'linkedin.cps5kt4trlcj.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'password273',
    database: 'LinkedIn'
});

module.exports = pool;