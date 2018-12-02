var kafka = require("../../kafka/client");
var passport = require("passport");
var express = require("express");
const router = express.Router();

const Recruiters = require("../../Model/Recruiter");

/*  Recruiter --> Login
    Login is facilitated by MYSQL DB
 */

router.post("/login", (req, res) => {
  console.log("Inside Recruiter login backend");
  kafka.make_request("recruiter_login", req.body, function(err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else {
      console.log("Inside else", results);
      if (results.code === 200) {
        console.log("Recruiter logged in successfully");
        res.status(results.code).json({
          success: true,
          token: "Bearer " + results.token
        });
      } else {
        console.log(`Recruiter-->Unable to Login. Error-->${results.err}`);
        res.status(results.code).json({
          error: results.err
        });
      }
      res.end();
    }
  });
});

/*  Recruiter --> Signup request with SQL and Mongo DB
    SQL DB --   stores recruiter email and password
    Mongo DB -- stores recruiter entire details (firstName, lastName, email and password)
                in recruiter schema.
*/

//Recruiter Signup MYSQL
router.post("/", (req, res) => {
  console.log("Inside Recruiter signup(MYSQL) backend");
  kafka.make_request("recruiter_signup", req.body, function(err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else {
      if (results.code === 201) {
        console.log("Recruiter record in MYSQL created successfully");
        res.status(results.code).json({
          success: true,
          token: "Bearer " + results.token
        });
      } else if (results.code === 409) {
        console.log("User already exists in MYSQL");
        res.status(results.code).json({
          message: "User already exists"
        });
      } else {
        console.log("Unable to create recruiter record in MYSQL");
        res.status(results.code).json({
          error: results.err
        });
      }
      res.end();
    }
  });
});

//Recruiter signup call for MongoDB
router.post("/mongo", (req, res) => {
  console.log("Inside Recruiter signup(MongoDB) backend");
  kafka.make_request("recruiter_signup_mongo", req.body, function(
    err,
    results
  ) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else {
      if (results.code === 201) {
        console.log("Recruiter record in MongoDB created successfully");
        res.status(results.code).json({
          success: true,
          token: "Bearer " + results.token
        });
      } else {
        console.log("Unable to create recruiter record in MongoDB");
        res.status(results.code).json({
          error: results.err
        });
      }
      res.end();
    }
  });
});

/*  Recruiter --> Update Profile 
    @param -- recruiterEmail
    @params --  recruiterDetails (could be first name, last name, city and others)
*/

router.put(
  "/:recruiter_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    kafka.make_request("recruiter_update_profile", req.body, function(
      err,
      results
    ) {
      console.log("in result");
      console.log(results);
      if (err) {
        console.log("Inside err");
        res.json({
          status: "error",
          msg: "System Error, Try Again."
        });
      } else {
        console.log("Inside else", results);
        if (results.code === 202) {
          res.status(results.code).json(results.message);
        } else {
          res.status(results.code).json(results.errorMessage);
        }
        res.end();
      }
    });
  }
);

//Get Recruiter details
router.get(
  "/:recruiter_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    kafka.make_request("recruiter_details", req.params, function(err, results) {
      console.log("in result");
      console.log(results);
      if (err) {
        console.log("Inside err");
        res.json({
          status: "error",
          msg: "System Error, Try Again."
        });
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
  }
);

//delete Recruiter
router.delete(
  "/:recruiter_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    kafka.make_request("recruiter_delete", req.body, function(err, results) {
      console.log("in result");
      console.log(results);
      if (err) {
        console.log("Inside err");
        res.json({
          status: "error",
          msg: "System Error, Try Again."
        });
      } else {
        console.log("Inside else", results);
        if (results.code === 202) {
          res.status(results.code).json(results.message);
        } else {
          res.status(results.code).json(results.errorMessage);
        }
        res.end();
      }
    });
  }
);

//GET LOGS of top ten jobs of recruiter he/she has posted
//Returns :
/*
{
    Jobs: [
           {job_id: "1", number_of_applicants: 800}, 
           {job_id: "2", number_of_applicants: 600}, 
           {job_id: "3", number_of_applicants: 700}, 
           {job_id: "4", number_of_applicants: 650}, 
           {job_id: "5", number_of_applicants: 900}, 
           {job_id: "6", number_of_applicants: 200}, 
           {job_id: "7", number_of_applicants: 300}, 
           {job_id: "8", number_of_applicants: 350}, 
           {job_id: "9", number_of_applicants: 100}, 
           {job_id: "10", number_of_applicants: 1000}
          ]
}
*/
router.get("/:recruiterId/jobs/top-ten", function(req, res) {
  console.log("inside backend jobs/top-ten");

  kafka.make_request(
    "logs_topic",
    { path: "getJobsTopTen", id: req.params.recruiterId },
    function(err, result) {
      if (err) {
        res
          .status(404)
          .json({ success: false, error: "Recruiter not found" })
          .send(err);
      } else console.log("Recruiter log Top Ten Jobs", result);
      {
        if (result.status) {
          res.status(200);
          res.send(result);
        } else {
          res.status(400).json({ success: false });
        }
      }
    }
  );
});

// Recruiter can view job details
router.get("/:recruiter_id/jobs/:job_id", function(req, res) {
  console.log("Backend Recruiter Job View");
  kafka.make_request(
    "recruiter_JobView",
    { job_id: req.params.job_id },
    function(err, results) {
      console.log("in result");
      console.log(results);
      if (err) {
        console.log("Inside err");
        res.json({
          status: "error",
          msg: "Unable to fetch Job."
        });
      } else {
        console.log("Inside else");
        res.json({
          fetchedJob: results
        });

        res.end();
      }
    }
  );
});

// Recruiter gets list of all their job posting
router.get("/:recruiter_id/jobs", function(req, res) {
  console.log("Backend Recruiter Job List ");
  kafka.make_request(
    "jobs_topic",
    { path: "listOfJobs", id: req.params.recruiter_id },
    function(err, results) {
      console.log("in result");
      console.log(results);
      if (err) {
        console.log("Inside err");
        res.json({
          status: "error",
          msg: "Unable to fetch list of Jobs."
        });
        res.end();
      } else {
        if (results.success) {
          console.log("Inside else");
          res.json({
            jobsList: results
          });
          res.end();
        } else {
          res.json({
            status: "error",
            msg: "Job list empty"
          });
          res.end();
        }
      }
    }
  );
});

//Recruiter updates job details
router.put("/:recruiter_id/jobs/:job_id", function(req, res) {
  kafka.make_request(
    "recruiter_JobUpdate",
    { job_id: req.params.job_id, body: req.body },
    function(err, results) {
      console.log("in result");
      console.log(results);
      if (err) {
        console.log("Inside err");
        res.json({
          status: "error",
          msg: "Unable to Update Job."
        });
      } else {
        console.log("Inside else");
        res.json({
          UpdatedJob: results
        });

        res.end();
      }
    }
  );
});

//Get Number of saved jobs for each job of recruiter
router.get("/:recruiterId/jobs/logs/saved-job-count", function(req, res) {
  console.log("inside backend get number of saved jobs");
  kafka.make_request(
    "jobs_topic",
    { path: "getSavedJobsNumber", recruiterId: req.params.recruiterId },
    function(err, result) {
      if (err) {
        res
          .status(404)
          .json({ success: false, error: "Jobs empty" })
          .send(err);
      } else {
        console.log("result", result);
        if (result.status) {
          res.status(200);
          res.send(result);
        } else {
          res.status(400).json({ success: false });
        }
      }
    }
  );
});

//Add Tracking details of a user by id
/*
Tested and working
*************************
pass user to be tracked email as param
pass location of user as Body    -->  {"location": "San Jose" }
*************************
*/
router.post("/:recruiterId/logs/applicants/:applicantId", function(req, res) {
  console.log("inside backend post track user by id");
  kafka.make_request(
    "logs_topic",
    { path: "createTrackUserById", id: req.params.applicantId, body: req.body },
    function(err, result) {
      if (err) {
        res
          .status(404)
          .json({ success: false, error: "User create track record failed" })
          .send(err);
      } else {
        console.log("User create track record ", result);
        if (result.status) {
          res.status(200);
          res.send(result);
        } else {
          res.status(400).json({ success: false });
        }
      }
    }
  );
});

//Update Tracking details of a user by id with existing page
/*
Tested and working
*************************
pass user to be tracked email as param
pass page user has visited as Body    -->  {"page": "User Login" }
*************************
*/
router.put("/:recruiterId/logs/applicants/:applicantId", function(req, res) {
  console.log("inside backend update track user by id");
  kafka.make_request(
    "logs_topic",
    { path: "updateTrackUserById", id: req.params.applicantId, body: req.body },
    function(err, result) {
      if (err) {
        res
          .status(404)
          .json({ success: false, error: "User update track record failed" })
          .send(err);
      } else {
        console.log("User update track record ", result);
        if (result.status) {
          res.status(200);
          res.send(result);
        } else {
          res.status(400).json({ success: false });
        }
      }
    }
  );
});

//Get Tracking details of a user by id
/*
Tested and working
*************************
pass user to be fetched  email as param
:applicantId  = goel1@gmail.com
*************************
*/
router.get("/:recruiterId/logs/applicants/:applicantId", function(req, res) {
  console.log("inside backend get track user by id");
  kafka.make_request(
    "logs_topic",
    { path: "trackUserById", id: req.params.applicantId },
    function(err, result) {
      if (err) {
        res
          .status(404)
          .json({ success: false, error: "User track record failed" })
          .send(err);
      } else {
        console.log("User track record ", result);
        if (result.status) {
          res.status(200);
          res.send(result);
        } else {
          res.status(400).json({ success: false });
        }
      }
    }
  );
});

//Route to get the Number of clicks for job (click per job posting graph in recruiter dashboard)
router.get("/:recruiterId/jobs/logs/click-count", function(req, res) {
  console.log("inside backend get click count");
  kafka.make_request(
    "logs_topic",
    { path: "getClickCount", id: req.params.recruiterId },
    function(err, result) {
      if (err) {
        res
          .status(404)
          .json({ success: false, error: "Get click count failed" })
          .send(err);
      } else {
        console.log("Click count Result ", result);
        if (result.status) {
          res.status(200);
          res.send(result);
        } else {
          res.status(400).json({ success: false });
        }
      }
    }
  );
});

// To increment the number of clicks in job schema
/*
Include this call in every route to a job details page
http://localhost:3001/recruiters/recruiter1@gmail.com/jobs/logs/click-count
BODY:
{
	"jobid":"5bfc781ce8df91050d1b484f"
}

*/
router.put("/jobs/logs/click-count", function(req, res) {
  console.log("inside backend update Click count for job", req.body.jobid);
  kafka.make_request(
    "logs_topic",
    { path: "updateClickCount", id: req.body.jobid },
    function(err, result) {
      if (err) {
        res
          .status(404)
          .json({ success: false, error: "Update click count failed" })
          .send(err);
      } else {
        console.log("Update click count success ", result);
        if (result.status) {
          res.status(200);
          res.send(result);
        } else {
          res.status(400).json({ success: false });
        }
      }
    }
  );
});

//Route to get the Bottom 5 job posting of a recruiter
router.get("/:recruiterId/last-five", function(req, res) {
  console.log("inside backend Find last 5 jobs");
  kafka.make_request(
    "logs_topic",
    { path: "lastFive", id: req.params.recruiterId },
    function(err, result) {
      if (err) {
        res
          .status(404)
          .json({ success: false, error: "Get Bottom 5 job posting failed" })
          .send(err);
      } else {
        console.log("bottom 5 jobs  are", result);
        if (result.status) {
          res.status(200);
          res.send(result);
        } else {
          res.status(400).json({ success: false });
        }
      }
    }
  );
});


//to edit summary
router.put(
    "/summary/edit",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const errors = {};
        kafka.make_request("edit_recruiter_summary", req.body, function(err, results) {
            console.log("in result");
            console.log(results);
            if (err) {
                console.log("Inside err");
                res.json({
                    status: "error",
                    msg: "System Error, Try Again."
                });
            } else {
                console.log("Inside else", results);
                if (results.code === 202) {
                    res.status(results.code).json(results.message);
                } else {
                    res.status(results.code).json(results.errorMessage);
                }

                res.end();
            }
        });
    }
);


module.exports = router;
