const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
var kafka = require('../../kafka/client');

const Applicants = require('../../Model/Applicant');


/*
********************************************************************************************************
handle cases for double url paramters like /applicants/{applicant_id}/jobs/{job_id}
********************************************************************************************************
*/

/*router.get('/detailsTraveller/:travellerEmail',  passport.authenticate('jwt', {session: false}),
    (req, res) => {

        const errors = {};
        kafka.make_request('traveller_details', req.params, function (err, results) {
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
                res.status(results.code).json(results.message);

                res.end();
            }


        });
    });*/

router.get('/:applicantId/logs/profile-view-count', function (req, res) {
    console.log("inside backend profile-view-count")
    
    kafka.make_request('logs_topic',{"path":"getProfileViewCount", "id":req.params.applicantId}, function(err,result){
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


router.post('/:applicantId/jobs/:jobId',function(req,res){
    //Update the corresponding JobId with this into job application object ($addToSet)
    //Increment noOfApplicants +1 
    //Increment noOfViews +1
    //
    //

    kafka.make_request('applicant_topic', {"applicantId":req.params.applicantId , "jobId":req.params.jobId, "data" : req.body }, function(err,results){
        if(err){
            throw err;
            done(err,{});
            }
        else{
            if(results.code == 200){
                return res.status(200).json(results.value);;
            }else{
                return res.status(500).json(results.value);;
            }
            }
        });
    });
      
    
module.exports = router;