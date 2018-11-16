// Hello world
var kafka = require("../../kafka/client");

var express = require("express");
const router = express.Router();


router.get('/recruiters/:recruiterId/jobs/top-ten', function (req, res) {
    console.log("inside backend jobs/top-ten")
  
    kafka.make_request('logs_topic',{"path":"getJobsTopTen", "id":req.params.recruiterId}, function(err,result){
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

  app.get('/recruiters/recruiter_id/jobs/job_id', function(req, res){

    kafka.make_request('recruiter_JobView',req.body.job_id, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"Unable to fetch Job."
            })
        }else{
            console.log("Inside else");
                res.json({
                    fetchedJob:results
                });

                res.end();
            }
    });
});

app.put('/recruiters/recruiter_id/jobs/job_id', function(req, res){
  kafka.make_request('recruiter_JobUpdate',{"id":req.body.job_id, "body":req.body}, function(err,results){
      console.log('in result');
      console.log(results);
      if (err){
          console.log("Inside err");
          res.json({
              status:"error",
              msg:"Unable to Update Job."
          })
      }else{
          console.log("Inside else");
              res.json({
                  UpdatedJob:results
              });

              res.end();
          }
  });
});
  
  module.exports = router;
