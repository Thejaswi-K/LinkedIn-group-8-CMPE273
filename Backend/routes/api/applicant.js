const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
var kafka = require('../../kafka/client');

const Applicants = require('../../Model/Applicant');

/*router.get('/detailsTraveller/:travellerEmail',  passport.authenticate('jwt', {session: false}),
    (req, res) => {

        const errors = {};
        kafka.make_request('traveller_details', req.params, function (err, results) {
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
                res.status(results.code).json(results.message);

                res.end();
            }


        });
    });*/

module.exports = router;