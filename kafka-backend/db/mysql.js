var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 100,
    port: '8889',
    host: '3.16.163.109',
    user: 'root',
    password: 'admin',
    database: 'linkedIn'
});

module.exports = pool;