var mysql = require('mysql');
var pool = require('../../db/pool');
const recruiterModel = require('../../Model/Recruiter');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');


function handle_request(msg, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    var recruiterEmail = msg.email;
    var recruiterPassword = msg.password;
    var isRecruiter = JSON.parse(msg.isRecruiter)
    console.log("Inside Recruiter Signup request");
        //If Recruiter, Insert the record in Recruiter Table
        // TODO: Add SQL Insertion Entry here

        let msql = "select email FROM recruiter where email=" + mysql.escape(recruiterEmail);
        var sql = "INSERT INTO recruiter (email,password) VALUES ( " + 
        mysql.escape(recruiterEmail) + " , " + mysql.escape(recruiterPassword) + ")";

        pool.getConnection((err,con) => {
            if(err){
                // res.writeHead(400,{
                //     'Content-Type' : 'text/plain'
                // })
                callback(err, 'Could Not Get Connection Object');
                // res.end("Could Not Get Connection Object");
            }else {
                con.query(msql,function(err,result){
                    if(result.length > 0){
                    console.log("Error while adding User Details");
                    console.log(result[0]);
                    // errors.email = 'Email already exists';
                    callback(err, 'Email already exists');
                    }else {
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(password, salt, (err, hash) => {
                              if (err) throw err;
                              recruiterPassword = hash;
                              console.log("Successfully hashed the password");
                              console.log(password);
                              let sql = "INSERT INTO recruiter (email,password) VALUES ( " + 
                              mysql.escape(recruiterEmail) + " , " + mysql.escape(recruiterPassword) + ")";
                              con.query(sql, (err, result))
                              if (result) {
                                // res.json(result);
                                console.log("User added ")
                              }
                              else {
                                console.log(err);
                              }
                            });
                        });
                        console.log(`Recruiter ${recruiterEmail} created successfully`);
                    }
                });
            }
        });

        var newRecruiter = new recruiterModel();
        recruiterModel.findOne({email: msg.email}, function(err,recruiter){
            console.log("Checking if the email already exists");
            if(recruiter) {
                console.log("Recruiter already exists");
                // res.send(400);
                callback(err, 'Recruiter already exists.');
            } else {
                console.log("email not found, creating new recruiter");
                // newTraveler = {
                    bcrypt.hash(msg.password,10,(err,hash)=>{
                        if(err) {
                            // return res.status(500).json({
                            //     error: err
                            // });
                            callback(err, 'error in hashing the password')
                        } else {
                            newRecruiter._id = new mongoose.Types.ObjectId(),
                            newRecruiter.firstName = msg.firstName;
                            newRecruiter.lastName = msg.lastName;
                            newRecruiter.email = msg.email;
                            newRecruiter.password = hash;
                            newRecruiter.phoneNumber =msg.phoneNumber||"";
                            newRecruiter.address = msg.address||"";
                            newRecruiter.city =msg.city||"";
                            newRecruiter.state =msg.state||"";
                            newRecruiter.zipCode =msg.zipCode||"";
                            newRecruiter.companyName =msg.companyName||"";
                            newRecruiter.profileImage =msg.profileImage||"preview.jpg";
                            newTraveler.gender =msg.gender||"";
                            newRecruiter.memberSince= msg.memberSince||Date.now();
                            newRecruiter.isRecruiter = msg.isRecruiter||true;
                            newRecruiter.connections =msg.connections||[];
                            newRecruiter.save()
                            .then(recruiter=>{
                                console.log("Recruiter record created: ", recruiter);
                                // res.sendStatus(200).end();
                                callback(null,recruiter);
                            })
                            .catch(err => {
                                console.log(err);
                                // res.sendStatus(400).end();
                                callback(err,'error in creating the user');
                            });
                        }
                // };
            })
        }
    })
}

// app.post('/login',function(req,res){
    
//     console.log("Inside Login Post Request");
//         var username = req.body.username;
//         var password = req.body.password;
//         var sql = "SELECT *  FROM cmpe273_usertable WHERE username = " + 
//                 mysql.escape(username) + "and password = " + mysql.escape(password);

//     pool.getConnection(function(err,con){
//         if(err){
//             res.writeHead(400,{
//                 'Content-Type' : 'text/plain'
//             })
//             res.end("Could Not Get Connection Object");
//         }else{
//             con.query(sql,function(err,result){
//                 if(err){
//                     res.writeHead(400,{
//                         'Content-Type' : 'text/plain'
//                     })
//                     res.end("Invalid Credentials");
//                 }else{
//                     res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
//                     req.session.user = result;
//                         res.writeHead(200,{
//                             'Content-Type' : 'text/plain'
//                         })
//                         res.end("Successful Login");
//                 }
//             });
//         }
//     });
    
// });