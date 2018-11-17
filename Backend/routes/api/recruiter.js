// Hello world
var kafka = require("../../kafka/client");

var express = require("express");
const router = express.Router();


//Recruiter login
router.post('/login', (req, res) => {
    kafka.make_request('recruiter_login', req.body, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Inside else", results);
            if (results.code === 200) {
                res.status(results.code).json({
                    success: true,
                    token: 'Bearer ' + results.token
                });
            } else {
                res.status(results.code).json({
                    error: results.err
                })
            }
            res.end();
        }
    });
});

//Recruiter Signup
router.post('/', (req, res) => {
    kafka.make_request('recruiter_signup', req.body, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            if (results.code === 201) {
                res.status(results.code).json({
                    success: true,
                    token: 'Bearer ' + results.token
                });
            } else {
                res.status(results.code).json({
                    error: results.err
                })
            }
            res.end();
        }
    });
});

//update Recruiter profile
router.put('/:recruiter_id',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        const errors = {};
        kafka.make_request('recruiter_update_profile', req.body, function (err, results) {
            console.log('in result');
            console.log(results);
            if (err) {
                console.log("Inside err");
                res.json({
                    status: "error",
                    msg: "System Error, Try Again."
                })
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
    });

//Get Recruiter details
router.get('/:recruiter_id', passport.authenticate('jwt', {session: false}),
    (req, res) => {

        const errors = {};
        kafka.make_request('recruiter_details', req.params, function (err, results) {
            console.log('in result');
            console.log(results);
            if (err) {
                console.log("Inside err");
                res.json({
                    status: "error",
                    msg: "System Error, Try Again."
                })
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
    });

//delete Recruiter
router.delete('/:recruiter_id',
passport.authenticate('jwt', {session: false}),
(req, res) => {

    const errors = {};
    kafka.make_request('recruiter_delete', req.body, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            console.log("Inside err");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
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
});

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
