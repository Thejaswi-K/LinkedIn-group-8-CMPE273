const applicantModel = require("../Model/Applicant");
const recruiterModel = require("../Model/Recruiter");
const jobsModel = require("../Model/Jobs");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const JWT_KEY = "secret";

require("dotenv").config();

exports.handlerService = function handlerService(msg, callback) {
  switch (msg.path) {
    case "getJobsTitleLocation":
      getJobsTitleLocation(msg, callback);
      break;
  }
};

function getJobsTitleLocation(msg, callback) {
  console.log("KAFKA : getJobsTitleLocation --> ", msg.id);
}
