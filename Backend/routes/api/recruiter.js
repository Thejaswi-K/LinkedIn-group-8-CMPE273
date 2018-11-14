// Hello world
var kafka = require("../../kafka/client");

var express = require("express");
var app = express();


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
  

