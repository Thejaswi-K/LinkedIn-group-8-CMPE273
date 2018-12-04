// Load Property model
const Applicants = require("../../Model/Applicant");
const Recruiter = require("../../Model/Recruiter");

function handle_request(msg, callback) {
  console.log("KAFKA : search Profile --> ", msg.body);
  var res = {};
  var profile1 = [];
  var profile2 = [];
  var profiles = [];
  Applicants.find({
    firstName: msg.firstName
  })

    .then(profile => {
      if (profile.length > 0) {
        console.log(profile);
        profile1.push(profile);
        profiles.push(profile1);
      }
      Recruiter.find({
        firstName: msg.firstName
      }).then(profile => {
        if (profile.length > 0) {
          profile2.push(profile);
          profiles.push(profile2);
        }
        // callback(null, profiles);
      });
      callback(null, profiles);
      console.log("Hi", profiles);
    })
    .catch(function(err) {
      res.message = err;
      res.code = 400;
      callback(null, res);
    });
  console.log("after callback" + res);
}

exports.handle_request = handle_request;
