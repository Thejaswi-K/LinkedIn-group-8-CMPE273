

var applicantModel = require('../Model/Applicant');
var recruiterModel = require('../Model/Recruiter');
var jobsModel = require('../Model/Jobs');

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const JWT_KEY = "secret";

var mongo = require("../db/mongo");
var mongoURL = "mongodb://mithun:password273@ds121753.mlab.com:21753/linkedin";
var ObjectId = require("mongodb").ObjectID;
require("dotenv").config();

exports.handlerService = function handlerService(msg, callback) {
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

function getSavedJobsNumber(msg, callback) {
  jobsModel.find({'recruiterId':msg.recruiterId}, function(err, jobs){
    if(err){
      callback(err, null);
    }
    else{
      if(jobs){
        callback(null, JSON.stringify({_id, savedBy}));
      }
    }
  });
}


function getJobsTitleLocation(msg, callback) {
  console.log("KAFKA : getJobsTitleLocation --> ", msg.title, msg.location);

  mongo.connect(
    mongoURL,
    function(err, db) {
      if (err) console.log("Mongo connection error", err);
      else {
        console.log("connected to mongo client");
        var result = db
          .collection("jobs")
          .find({ title: msg.title, location: msg.location });
        result
          .then(doc => {
            console.log("obtained results from mongo", doc);

            console.log("Fetch  success, callback happening");
            callback(null, {
              success: true,
              status: "Fetched jobs success",
              jobs: doc
            });
          })
          .catch(error => {
            console.log("Job Fetch error ", error);
            callback(null, { success: false, status: "Job Fetch failed" });
          });
      }
    }
  );
}

function getJobsDetail(msg, callback) {
  console.log("KAFKA : getJobsDetail --> ", msg.id);

  mongo.connect(
    mongoURL,
    function(err, db) {
      if (err) console.log("Mongo connection error", err);
      else {
        console.log("connected to mongo client");
        var result = db.collection("jobs").findOne({ _id: ObjectId(msg.id) });
        result
          .then(doc => {
            if (doc != null) {
              console.log("obtained results from mongo", doc);

              console.log("Fetch  success, callback happening");
              callback(null, {
                success: true,
                status: "Fetched jobs success",
                jobs: doc
              });
            } else {
              console.log("Job Detail Fetch error ", error);
              callback(null, { success: false, status: "Job Detail Fetch failed" });
            }
          })
          .catch(error => {
            console.log("Job Fetch error ", error);
            callback(null, { success: false, status: "Job Detail Fetch failed" });
          });
      }
    }
  );
}
