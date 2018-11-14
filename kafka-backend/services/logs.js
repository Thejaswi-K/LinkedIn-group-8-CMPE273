const applicantModel = require("../Model/Applicant");
const recruiterModel = require("../Model/Recruiter");
const jobsModel = require("../Model/Jobs");


const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const JWT_KEY = "secret";

require("dotenv").config();




exports.handlerService = function handlerService(msg, callback) {
    switch (msg.path) {
      case "getProfileViewCount":
        getProfileViewCount(msg, callback);
        break;
      case "getJobsTopTen":
      getJobsTopTen(msg, callback);
        break

    }
  };



function getProfileViewCount(msg,callback){
    console.log("KAFKA : getProfileViewCount --> ", msg.id);

}


function getJobsTopTen(msg,callback){
  console.log("KAFKA : getJobsTopTen --> ", msg.id);

}