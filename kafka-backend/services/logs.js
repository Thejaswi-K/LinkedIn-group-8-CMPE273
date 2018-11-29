const applicantModel = require("../Model/Applicant");
const recruiterModel = require("../Model/Recruiter");
const jobsModel = require("../Model/Jobs");
const userTrackerModel = require("../Model/userTracker");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const JWT_KEY = "secret";

require("dotenv").config();

exports.handle_request = function handle_request(msg, callback) {
  switch (msg.path) {
    case "getProfileViewCount":
      getProfileViewCount(msg, callback);
      break;
    case "updateProfileViewCount":
      updateProfileViewCount(msg, callback);
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
    case "getClickCount":
      clickCount(msg, callback);
      break;
    case "updateClickCount":
      clickCountIncrementer(msg, callback);
      break;
    case "lastFive":
      lastFiveJobs(msg, callback);
      break;
  }
};

//profile view count for 30 days
function getProfileViewCount(msg, callback) {
  /*
https://stackoverflow.com/questions/5168904/group-by-dates-in-mongodb
https://stackoverflow.com/questions/23116330/mongodb-select-count-group-by 
*/

  /*
      [
      { $match: { email: msg.id } },
      { $group: { _id: { profileViewCount : {date : "$Date"} }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
      { $limit: 30 }
    ]
*/
  console.log("KAFKA : getProfileViewCount --> ", msg.id);
  applicantModel
    .aggregate([
      { $match: { email: msg.id } },
      { $project: { _id: 0, profileViewCount: 1 } },
      { $unwind: "$profileViewCount" },
      {
        $group: {
          _id: { day: { $dayOfMonth: "$profileViewCount.date" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } },
      { $limit: 30 }
    ])
    .then(count => {
      console.log("Result in get profile view count is ", count);
      callback(null, {
        success: true,
        status: "Profile View Count Success",
        data: count
      });
    })
    .catch(err => {
      console.log("Profile view count aggregation failed", err);
      callback(null, {
        success: false,
        status: "Profile view count fetch failed"
      });
    });
}

//Updates the applicant profile view count, when someone visits profile page
/*
PUT :  applicant/:applicantId/logs/profile-view-count
*/
function updateProfileViewCount(msg, callback) {
  console.log("KAFKA : updateProfileViewCount --> ", msg.id);
  applicantModel
    .findOneAndUpdate(
      { email: msg.id },
      {
        $push: {
          profileViewCount: {}
        }
      }
    )
    .then(user => {
      console.log("TimeStamp of Profile View tracked/ User:  ", user);
      callback(null, { success: true, status: "Profile View Count Added" });
    })
    .catch(err => {
      console.log("Find and update error in Profile View Count ", err);
      callback(null, { success: false, status: " Profile view count failed " });
    });
}

function getJobsTopTen(msg, callback) {
  console.log("KAFKA : getJobsTopTen --> ", msg.id);
}
//Get request to fetch particular user track history
function trackUserId(msg, callback) {
  console.log("KAFKA : trackuser by ID  --> ", msg.id);

  console.log("In handle request:" + JSON.stringify(msg));
  userTrackerModel
    .findOne({ username: msg.id }, "tracker")
    .then(trackDetails => {
      if (!trackDetails) {
        callback(null, {
          success: false,
          status: "No track details found for user"
        });
      } else {
        callback(null, {
          success: true,
          status: "Tracking details found",
          data: trackDetails
        });
      }
    })
    .catch(function(err) {
      callback(null, { success: false, sstatus: "error for track user" });
    });
}

/*
Tested and working
*************************
pass user to be tracked email as param
pass location of user as Body    -->  {location: "San Jose" }
*************************
*/
function createTrackUserId(msg, callback) {
  console.log("KAFKA : create trackuser by ID  --> ", msg.id);

  console.log("In handle request:" + JSON.stringify(msg));
  userTrackerModel.findOne({ username: msg.id }).then(user => {
    if (user) {
      console.log(
        "tracking details for user already exist, perform update call"
      );
      callback(null, {
        success: false,
        status: "Tracker for user already exist"
      });
    } else {
      const newTracker = new userTrackerModel({
        username: msg.id,
        location: msg.body.location,
        tracker: {
          page: "Sign up"
        }
      });
      newTracker
        .save()
        .then(function(result) {
          console.log("user tracking success : ", result);
          callback(null, { success: true, status: "user tracking started" });
        })
        .catch(function(err) {
          console.log("user tracking failed : ", err);
          callback(nll, {
            success: false,
            status: "user tracking failed, retry"
          });
        });
    }
  });
}

//pass the page as req.body.page
function updateTrackUserId(msg, callback) {
  console.log("KAFKA : update trackuser by ID  --> ", msg.id, msg.body);

  console.log("In handle request:" + JSON.stringify(msg));
  userTrackerModel
    .findOneAndUpdate(
      { username: msg.id },
      {
        $push: {
          tracker: {
            page: msg.body.page
          }
        }
      }
    )
    .then(user => {
      console.log("Find and update successful ", user);
      callback(null, { success: true, status: "page added to user tracker" });
    })
    .catch(err => {
      console.log("Find and update error in tracker ", err);
      callback(null, { success: false, status: " Page tracking failed " });
    });
}

//Get request to fetch particular recrtuier click count for job (Clicks per job posting)
function clickCount(msg, callback) {
  console.log("KAFKA : job ClickCount  of  --> ", msg.id);

  console.log("In handle request:" + JSON.stringify(msg));
  jobsModel
    .find({ recruiterId: msg.id, noOfViews: { $gt: 0 } }, "title noOfViews")
    .then(clickCount => {
      if (!clickCount) {
        callback(null, {
          success: false,
          status: "No clickCounts found for user"
        });
      } else {
        callback(null, {
          success: true,
          status: "clickCount found",
          data: clickCount
        });
      }
    })
    .catch(function(err) {
      callback(null, { success: false, status: "error for clickCount" });
    });
}

// To increment the number of clicks in job schema
/*
Include this call in every route to a job details page
BODY:
{
	"jobid":"5bfc781ce8df91050d1b484f"
}

*/
function clickCountIncrementer(msg, callback) {
  console.log("KAFKA : job clickCountIncrementer  of  --> ", msg.id);

  console.log("In handle request:" + JSON.stringify(msg));
  jobsModel
    .findOneAndUpdate({ _id: msg.id }, { $inc: { noOfViews: 1 } })
    .then(clickCount => {
      if (!clickCount) {
        callback(null, {
          success: false,
          status: "No clickCounts increment for user"
        });
      } else {
        callback(null, {
          success: true,
          status: "clickCount incremented",
          data: clickCount
        });
      }
    })
    .catch(function(err) {
      callback(null, {
        success: false,
        status: "error for clickCountIncrementer"
      });
    });
}

//Get request to fetch Bottom 5 jobs of a recruiter (least number of applications)
function lastFiveJobs(msg, callback) {
  console.log("KAFKA : Last five jobs  of  --> ", msg.id);

  console.log("In handle request:" + JSON.stringify(msg));
  jobsModel
    .aggregate([
      { $match: { recruiterId: msg.id } },
      {
        $project: {
          jobTitle: 1,
          jobApplicationssize: {$size: { "$ifNull": [ "$jobApplications", [] ] } }
        }
      },
      // {$pull : {jobApplicationssize:{$lt:1}}},
      { $sort: { "jobApplicationssize": -1 } },
      { $limit: 5 }
    ])

    .then(jobs => {
      if (!jobs) {
        callback(null, {
          success: false,
          status: "No jobs found for user"
        });
      } else {
        callback(null, {
          success: true,
          status: "jobs found",
          data: jobs
        });
      }
    })
    .catch(function(err) {
      callback(null, { success: false, status: "error for jobs" });
    });
}
