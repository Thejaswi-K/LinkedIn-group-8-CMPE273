const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
var kafka = require("../../kafka/client");

const Applicants = require("../../Model/Applicant");

/*
********************************************************************************************************
handle cases for double url paramters like /applicants/{applicant_id}/jobs/{job_id}
********************************************************************************************************
*/

//applicant login
router.post("/login", (req, res) => {
  kafka.make_request("applicant_login", req.body, function(err, results) {
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
        res.status(results.code).json({
          success: true,
          token: "Bearer " + results.token
        });
      } else {
        res.status(results.code).json({
          error: results.err
        });
      }

      res.end();
    }
  });
});

//applicant signup
router.post("/", (req, res) => {
  // const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  /* if (!isValid) {
         return res.status(400).json(errors);
     }*/

  kafka.make_request("applicant_signup", req.body, function(err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else {
      if (results.code === 200) {
        res.status(results.code).json({
          success: true,
          token: "Bearer " + results.token
        });
      } else {
        res.status(results.code).json({
          error: results.err
        });
      }
      res.end();
    }
  });
});

//applicant signup call for mongodb
router.post("/mongo", (req, res) => {
  // const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  /* if (!isValid) {
         return res.status(400).json(errors);
     }*/

  kafka.make_request("applicant_signup_mongo", req.body, function(
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
      if (results.code === 200) {
        res.status(results.code).json({
          success: true,
          token: "Bearer " + results.token
        });
      } else {
        res.status(results.code).json({
          error: results.err
        });
      }
      res.end();
    }
  });
});

//add applicant profile experience
router.put(
  "/experience/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    kafka.make_request("add_experience", req.body, function(err, results) {
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

//edit applicant profile experience
router.put(
  "/experience/edit",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    kafka.make_request("edit_experience", req.body, function(err, results) {
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

//edit applicant profile education
router.put(
  "/education/edit",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    kafka.make_request("edit_education", req.body, function(err, results) {
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

//to add education
router.put(
  "/education/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    kafka.make_request("add_education", req.body, function(err, results) {
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

//to edit skills
router.put(
  "/skills/edit",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    kafka.make_request("edit_skill", req.body, function(err, results) {
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

//to add skills
router.put(
  "/skills/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    kafka.make_request("add_skill", req.body, function(err, results) {
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

//to edit summary
router.put(
  "/summary/edit",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    kafka.make_request("edit_summary", req.body, function(err, results) {
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

//update applicant profile
router.put(
  "/:applicant_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    kafka.make_request("applicant_update_profile", req.body, function(
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
      }
    });
  }
);

//Get Applicant details
router.get(
  "/:applicant_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    kafka.make_request("applicant_details", req.params, function(err, results) {
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

//Get Applicant details
router.get(
  "/:applicant_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    kafka.make_request("applicant_details", req.params, function(err, results) {
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

//delete applicant
router.delete(
  "/:applicant_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    kafka.make_request("applicant_delete", req.body, function(err, results) {
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

//Get Profile view count of particular applicant
router.get("/:applicantId/logs/profile-view-count", function(req, res) {
  console.log("inside backend profile-view-count");

  kafka.make_request(
    "logs_topic",
    { path: "getProfileViewCount", id: req.params.applicantId },
    function(err, result) {
      if (err) {
        res
          .status(404)
          .json({ success: false, error: "Applicant not found" })
          .send(err);
      } else console.log("applicant log profile view count", result);
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

//applicant Applies for new job
router.post("/:applicantId/jobs/:jobId", function(req, res) {
  //Update the corresponding JobId with this info into job application object ($addToSet)
  //Increment noOfViews +1
  // add jobId into applicant Collection as appliedJobs
  //

  kafka.make_request(
    "applicant_topic",
    {
      path: "jobApply",
      applicantId: req.params.applicantId,
      jobId: req.params.jobId,
      data: req.body
    },
    function(err, results) {
      if (err) {
        throw err;
        done(err, {});
      } else {
        if (results.code == 200) {
          return res.status(200).json(results.value);
        } else {
          return res.status(500).json(results.value);
        }
      }
    }
  );
});

//applicant Saves job
router.post("/:applicantId/jobs/:jobId/save", function(req, res) {
  //Update applicant schema ADD jobid into savedJobs
  //store applicant id in savedJobs of Jobs
  kafka.make_request(
    "applicant_topic",
    {
      path: "jobSave",
      applicantId: req.params.applicantId,
      jobId: req.params.jobId,
      data: req.body
    },
    function(err, results) {
      if (err) {
        throw err;
        done(err, {});
      } else {
        if (results.code == 200) {
          return res.status(200).json(results.value);
        } else {
          return res.status(500).json(results.value);
        }
      }
    }
  );
});

/**************** Applicant Sending Message ********** */

router.post("/sendMessage", (req, res) => {
  console.log("Inside sending the message to the Target");
  console.log(req.body.from_email);
  console.log(req.body.to_email);
  console.log(req.body.sendMessage);

  kafka.make_request("send_message", req.body, function(err, results) {
    console.log("In sending message success call");
    console.log(results);
    if (err) {
      console.log("Inside Error");
      return res.status(400).json({
        message: "Replying back Failed"
      });
    } else {
      console.log("Successfully stored the message");
      return res.status(200).json(results);
    }
  });
});

/****************Receiving Messages *************** */
router.get("/receiveMessage", (req, res) => {
  console.log("Inside getting messages conversation");
  console.log(req.query.from_email);
  console.log(req.query.to_email);
  kafka.make_request("receive_message", req.query, function(err, results) {
    console.log("In message conversation result call");
    console.log(results);
    if (err) {
      console.log("Inside err");
      return res.status(400).json({
        message: "Getting message conversation Failed"
      });
    } else {
      console.log("Inside getting message conversation Success");
      return res.status(200).json(results);
    }
  });
});

/****************Applicant Messages Names *************** */

router.get("/applicantMessages", (req, res) => {
  console.log("Inside getting messagers names");
  console.log(req.query.from_email);
  kafka.make_request("applicant_messages", req.query, function(err, results) {
    console.log("In message names result call");
    console.log(results);
    if (err) {
      console.log("Inside err");
      return res.status(400).json({
        message: "Getting message names Failed"
      });
    } else {
      console.log("Inside getting message names Success");
      return res.status(200).json(results);
    }
  });
});

/****************Applicant View All Connections*********************/
router.get("/viewconnections/:applicant_id", function(req, res) {
  console.log("Backend Applicant View Connections");
  kafka.make_request(
    "applicant_ViewConnection",
    { applicant_id: req.params.applicant_id },
    function(err, results) {
      console.log("in result");
      console.log(results);
      if (err) {
        console.log("Inside err");
        res.json({
          status: "error",
          msg: "Unable to fetch Connections."
        });
      } else {
        console.log("Inside else");
        res.json({
          fetchedConnections: results
        });
        res.end();
      }
    }
  );
});

/****************Applicant Send Connection*********************/
router.post("/connections/:applicant_id", function(req, res) {
  console.log("Backend Applicant Send Connection");
  kafka.make_request(
    "applicant_SendConnection",
    { applicant_id: req.params.applicant_id, body: req.body },
    function(err, results) {
      console.log("in result");
      console.log(results);
      if (err) {
        console.log("Inside err");
        res.json({
          status: "error",
          msg: "Unable to Send Connection."
        });
      } else {
        console.log("Inside else");
        res.json({
          SendConnections: results
        });

        res.end();
      }
    }
  );
});

module.exports = router;
