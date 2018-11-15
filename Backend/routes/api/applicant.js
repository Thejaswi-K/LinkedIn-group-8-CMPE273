const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
var kafka = require('../../kafka/client');

const Applicants = require('../../Model/Applicant');


/*
********************************************************************************************************
handle cases for double url paramters like /applicants/{applicant_id}/jobs/{job_id}
********************************************************************************************************
*/

router.post('/login', (req, res) => {
    kafka.make_request('applicant_login', req.body, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else", results);
            if (results.code === 200) {
                res.status(results.code).json({
                    success: true,
                    token: 'Bearer ' + results.token
                });
            } else {
                res.status(results.code).json({
                    error: results.err
                })
            }


            res.end();
        }

    });
});

router.get('/applicants/:applicant_id', passport.authenticate('jwt', {session: false}),
    (req, res) => {

        const errors = {};
        kafka.make_request('applicant_details', req.params, function (err, results) {
            console.log('in result');
            console.log(results);
            if (err) {
                console.log("Inside err");
                res.json({
                    status: "error",
                    msg: "System Error, Try Again."
                })
            } else {
                console.log("Inside else", results);
                if (results.code === 200) {
                    res.status(results.code).json(results.message);
                } else {
                    res.status(results.code).json(results.message);
                }


                res.end();
            }


        });
    });

router.get('/applicants/:applicant_id/logs/profile-view-count', function (req, res) {
    console.log("inside backend profile-view-count")

    kafka.make_request('logs_topic', {
        "path": "getProfileViewCount",
        "id": req.params.applicant_id
    }, function (err, result) {
        if (err) {
            res.status(404).json({success: false, error: "Applicant not found"}).send(err);
        }
        else
            console.log("applicant log profile view count", result);
        {
            if (result.status) {
                res.status(200)
                res.send(result);
            } else {
                res.status(400)
                    .json({success: false})
            }
        }
    });
});


module.exports = router;