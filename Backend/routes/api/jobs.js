// Hello world
var express = require("express");
var app = express();

var kafka = require("../../kafka/client");

app.get("/jobs/:title&:location", function(req, res) {
  console.log("inside backend /jobs/:title&:location");

  kafka.make_request(
    "jobs_topic",
    {
      path: "getJobsTitleLocation",
      title: req.params.title,
      location: req.params.location
    },
    function(err, result) {
      if (err) {
        res
          .status(404)
          .json({ success: false, error: "Job not found" })
          .send(err);
      } else console.log("Job search", result);
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

app.get("/jobs/:job_id", function(req, res) {
  console.log("inside backend get jobs details");

  kafka.make_request(
    "jobs_topic",
    { path: "getJobsDetail", id: req.params.job_id },
    function(err, result) {
      if (err) {
        res
          .status(404)
          .json({ success: false, error: "Job not found" })
          .send(err);
      } else console.log("Job details", result);
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
