//import the require dependencies
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var cors = require("cors");
app.use(require("sanitize").middleware);

var mysql = require("mysql");


var jwt = require("jsonwebtoken");
var passport = require("passport");


var kafka = require("./kafka/client");

app.use(cors({ origin: "localhost:3000", credentials: true }));

//Allow Access Control
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});







app.get('/applicants/:applicant_id/logs/profile-view-count', function (req, res) {
    console.log("inside backend profile-view-count")
  
    kafka.make_request('logs_topic',{"path":"getProfileViewCount", "id":req.params.applicant_id}, function(err,result){
        if(err){
            res.status(404).json({success:false,  error: "Applicant not found"}).send(err);
        }
        else
        console.log("applicant log profile view count", result);
        { if(result.status){
          res.status(200)
          res.send(result);
        }else{ 
          res.status(400)
          .json({success: false})
        }
        }
    });
  });
  




app.get('/recruiters/:recruiter_id/jobs/top-ten', function (req, res) {
    console.log("inside backend jobs/top-ten")
  
    kafka.make_request('logs_topic',{"path":"getJobsTopTen", "id":req.params.recruiter_id}, function(err,result){
        if(err){
            res.status(404).json({success:false,  error: "Recruiter not found"}).send(err);
        }
        else
        console.log("Recruiter log Top Ten Jobs", result);
        { if(result.status){
          res.status(200)
          res.send(result);
        }else{ 
          res.status(400)
          .json({success: false})
        }
        }
    });
  });
  

app.get('/healthcheck', (req,res) =>{
    console.log("health check success")
    res.status(200)
    res.send();
    
  })

app.listen(3001);
console.log("Server Listening on port 3001");


