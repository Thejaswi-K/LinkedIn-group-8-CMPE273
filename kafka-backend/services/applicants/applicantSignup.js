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

            /*  var res = {};
              ApplicantUser.findOne({email:msg.email})
                  .then(user => {
                      if (user) {
                          res.value = 'User already exists!';
                          res.code = 409;
                          callback(null, res);
                      } else {


                          const newUser = new ApplicantUser({
                              firstName: msg.firstName,
                              lastName: msg.lastName,
                              email: msg.email,
                              password: msg.password,
                              isRecruiter: false,
                              phoneNumber: "",
                              address: "",
                              city: "",
                              state: "",
                              zipcode: "",
                              experience: [],
                              education: [],
                              skills: "",
                              profileSummary: "",
                              profileImage: "",
                              resume: "",
                              gender: "",
                              memberSince: "",
                              savedJobs: [],
                              appliedJobs: [],
                              connectionsRequests: [],
                              connections: []
                          });

                          bcrypt.genSalt(10, (err, salt) => {
                              bcrypt.hash(newUser.password, salt, (err, hash) => {
                                  if (err) throw err;
                                  newUser.password = hash;

                                  const payload = {
                                      email: newUser.email,
                                      isRecruiter: false
                                  }; // Create JWT Payload

                                  const token = jwt.sign(payload, keys.secretOrKey);

                                  newUser
                                      .save()
                                      .then(function (result) {
                                          res.code = 200;
                                          res.token = token;
                                          res.user = result;
                                          callback(null, res);
                                      })
                                      .catch(function (err) {
                                          res.err = 'Password incorrect';
                                          res.code = 400;
                                          callback(null, res);
                                      });

                                  // Sign Token
                                  /!* jwt.sign(
                                       payload,
                                       keys.secretOrKey,
                                       {expiresIn: 3600},
                                       (err, token) => {
                                           res.status(200).json({
                                               success: true,
                                               token: 'Bearer ' + token
                                           });
                                       }
                                   );*!/

                              });
                          });
                      }
                  });
          */

            console.log("after callback" + this.res);
        })
    })
};


async function mongoSignin(msg) {

    var res = {};
    ApplicantUser.findOne({email: msg.email})
        .then(user => {
            if (user) {
                res.err = 'User already exists!';
                res.code = 409;
                this.resolve(null, res);
            } else {


                const newUser = new ApplicantUser({
                    firstName: msg.firstName,
                    lastName: msg.lastName,
                    email: msg.email,
                    password: msg.password,
                    isRecruiter: false,
                    phoneNumber: "",
                    address: "",
                    city: "",
                    state: "",
                    zipcode: "",
                    experience: [],
                    education: [],
                    skills: "",
                    profileSummary: "",
                    profileImage: "",
                    resume: "",
                    gender: "",
                    memberSince: "",
                    savedJobs: [],
                    appliedJobs: [],
                    connectionsRequests: [],
                    connections: []
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;

                        const payload = {
                            email: newUser.email,
                            isRecruiter: false
                        }; // Create JWT Payload

                        const token = jwt.sign(payload, keys.secretOrKey);

                        newUser
                            .save()
                            .then(function (result) {
                                res.code = 200;
                                res.token = token;
                                res.user = result;
                                this.resolve(null, res);
                            })
                            .catch(function (err) {
                                res.err = 'Password incorrect';
                                res.code = 400;
                                this.resolve(null, res);
                            });
                    });
                });
            }
        });

}


exports.handle_request = handle_request;


