const applicantModel = require("../Model/Applicant");
const recruiterModel = require("../Model/Recruiter");
const jobsModel = require("../Model/Jobs");
const userTrackerModel = require ("../Model/userTracker");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const JWT_KEY = "secret";

require("dotenv").config();




exports.handle_request = function handle_request(msg, callback) {
  switch (msg.path) {
    case "getProfileViewCount":
      getProfileViewCount(msg, callback);
      break;
    case "getJobsTopTen":
      getJobsTopTen(msg, callback);
      break;
    case "trackUserById":
      trackUserId(msg, callback);
      break;
    case "createTrackUserById":
      createTrackUserId(msg, callback);
      break;
    case "updateTrackUserById":
      updateTrackUserId(msg, callback);
      break;

    }
  };



function getProfileViewCount(msg,callback){
    console.log("KAFKA : getProfileViewCount --> ", msg.id);

}


function getJobsTopTen(msg,callback){
  console.log("KAFKA : getJobsTopTen --> ", msg.id);

}

function trackUserId(msg,callback){
  console.log("KAFKA : trackuser by ID  --> ", msg.id)
  
  console.log("In handle request:"+ JSON.stringify(msg));
  userTrackerModel.findOne({username: msg.id},'tracker')
      .then(trackDetails => {
          if (!trackDetails) {
              callback(null,{success: false, sstatus : "No track details found for user"});
          } else {
              
              callback(null,{success : true, status: "Tracking details found" , data : trackDetails });
          }
      })
      .catch(function (err) {
        callback(null,{success: false, sstatus : "error for track user"});
      });
  
}


function createTrackUserId(msg,callback){
  console.log("KAFKA : create trackuser by ID  --> ", msg.id)
  
  console.log("In handle request:"+ JSON.stringify(msg));
  userTrackerModel.findOne({username: msg.id})
    .then(user => {
      if(user){
        console.log("tracking details for user already exist, perform update call");
        callback(null, {success:false, status: "Tracker for user already exist"});
      }else{ 
        const newTracker = new userTrackerModel({
          username : msg.id,
          location : msg.body.location,
          tracker : {
            page: "Sign up"
          }
        });
        newTracker.save()
        .then(function(result){
          console.log("user tracking success : ", result);
          callback(null, {success:true, status:"user tracking started"});
        })
        .catch(function(err){
          console.log("user tracking failed : ", err)
          callback(nll, {success: false, status : "user tracking failed, retry"})
        })
      }
    })

  
}


function updateTrackUserId(msg,callback){
  console.log("KAFKA : update trackuser by ID  --> ", msg.id , msg.body)
  
  console.log("In handle request:"+ JSON.stringify(msg));
  
  
}
