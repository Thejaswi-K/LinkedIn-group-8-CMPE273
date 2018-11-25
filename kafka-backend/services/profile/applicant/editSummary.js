const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const keys = require('../../../config/keys');


// Load OwnerUser model
const Applicant = require('../../../Model/Applicant');

function handle_request(msg, callback) {


    var res = {};

    const profileFields = {};



    Applicant.findOne({email: msg.email})
        .then(profile => {
            if (!profile) {
                res.errorMessage = 'There is no  user with this id.';
                res.code = 404;
                callback(null, res);

            }

            profile.firstName = msg.summary.experience;
            profile.lastName = msg.summary.experience;
            profile.city = msg.summary.experience;
            profile.state = msg.summary.experience;
            profile.profileSummary = msg.summary.profileSummary;
            profile.save()
                .then(profile => {
                    res.code = 202;
                    var summary = {
                        firstName: profile.firstName,
                        lastName: profile.lastName,
                        city: profile.city,
                        state: profile.state,
                        profileSummary: profile.profileSummary
                    };
                    res.message = summary;
                    callback(null, res);
                });


        })
        .catch(function (err) {
            res.code = 404;
            res.errorMessage = err;
            callback(null, res);
        });


    console.log("after callback" + this.res);
};

exports.handle_request = handle_request;