const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const keys = require('../../config/keys');
var mysql = require('mysql');
var pool = require('../../db/pool');


// Load Applicant model
const ApplicantUser = require('../../Model/Applicant');

function handle_request(msg, callback) {

    var a;
    var b;


    var res = {};
    var password = msg.password;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            password = hash;
            const payload = {
                email: msg.email,
                isRecruiter: false
            }; // Create JWT Payload
            console.log("Inside Create Owner SignUp Request Handler");
            var sql = "INSERT INTO APPLICANT (EMAIL, PASSWORD, IS_RECRUITER) VALUES ( " +
                mysql.escape(msg.email) + " , " + mysql.escape(password) + " , " + mysql.escape(false) + " ) ";
            pool.getConnection(function (err, con) {

                if (err) {
                    res.err = err;
                    res.code = 400;
                    callback(null, res);
                } else {
                    con.query(sql, function (err, result) {
                        if (err) {
                            res.err = err;
                            res.code = 400;
                            callback(null, res);
                        } else {
                            jwt.sign(
                                payload,
                                keys.secretOrKey,
                                {expiresIn: 3600},
                                (err, token) => {
                                    res.code = 200;
                                    res.token = token;
                                    callback(err, res);
                                }
                            );
                        }


                    });

                }

            });
            console.log("after callback" + this.res);
        })
    })
};
exports.handle_request = handle_request;


