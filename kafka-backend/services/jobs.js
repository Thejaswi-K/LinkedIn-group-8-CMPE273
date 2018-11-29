var applicantModel = require("../Model/Applicant");
var recruiterModel = require("../Model/Recruiter");
var jobsModel = require("../Model/Jobs");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const JWT_KEY = "secret";

var mongo = require("../db/mongo");
var mongoURL = "mongodb://mithun:password273@ds121753.mlab.com:21753/linkedin";
var ObjectId = require("mongodb").ObjectID;
require("dotenv").config();

exports.handle_request = function handle_request(msg, callback) {
  switch (msg.path) {
    case "getJobsTitleLocation":
      getJobsTitleLocation(msg, callback);
      break;
    case "getJobsDetail":
      getJobsDetail(msg, callback);
      break;
    case "getSavedJobsNumber":
      getSavedJobsNumber(msg, callback);
  }
};



//jobModel.aggregate([{$match: {recruiterId: msg.recruiterId}}, {$project: {savedBy: {$size: '$savedBy'}}}])
function getSavedJobsNumber(msg, callback) {
  jobsModel.find({ recruiterId: msg.recruiterId }, function(err, jobs) {
    if (err) {
      callback(err, null);
    } else {
      if (jobs) {
        callback(null, JSON.stringify({ _id, savedBy }));
      }
    }
  });
}

//Search Job based on title and location
function getJobsTitleLocation(msg, callback) {
  console.log("KAFKA : getJobsTitleLocation --> ", msg.title, msg.location);

  //not working with array? ? ?
  jobsModel
    .find({ $or: [{ title: msg.title }, { location: msg.location }] })
    .then(job => {
      console.log("result of jobs", job);
      if (!job) {
        callback(null, {
          success: false,
          status: "Job doesnt exist in getJobsTitleLocation"
        });
      }
      callback(null, {
        success: true,
        status: "Job fetched Success",
        data: job
      });
    })
    .catch(error => {
      console.log("Error at connecting to Jobs");
      callback(error, {
        success: false,
        status: "Failed connecting to Mongo in getJobsTitleLocation"
      });
    });
}

//GET jobs details based on job_id
function getJobsDetail(msg, callback) {
  console.log("KAFKA : getJobsDetail --> ", msg.id);
  jobsModel
    .find({ _id: msg.id })
    .then(job => {
      if (!job) {
        callback(null, { success: false, status: "Job doesnt exist" });
      }
      callback(null, {
        success: true,
        status: "Job fetched Success",
        data: job
      });
    })
    .catch(error => {
      console.log("Error at connecting to Jobs");
      callback(error, { success: false, status: "Failed connecting to mongo" });
    });
}
