// Load Property model
const ApplicantUser = require('../../Model/Applicant');
const JobsModel = require('../../Model/Jobs');
const JobApplicationModel = require('../../Model/JobApplication');

function handle_request(msg, callback) {


    var res = {};
    var newJobApplication = new JobApplicationModel(); //intialize the subdocument

    console.log("In handle request Apply Jobs:"+ JSON.stringify(msg));
    JobsModel.findOne({'jobApplication.applicant_id': msg.applicantId}), function(err, jobApp){
        console.log("Check if applicant has already applied for same job");
        if(jobApp){
            console.log("Applicant has already applied");
            callback(err, {success:false, status : "Already applied to job"});

        }else{
            console.log("Applicant has not applied before ");
            newJobApplication.applicant_id = msg.applicantId;
            newJobApplication.firstName =msg.data.first_name;
            newJobApplication.lastName = msg.data.last_name;
            newJobApplication.address = msg.data.address;
            newJobApplication.hearAboutUs = msg.data.referral;
            newJobApplication.diversity=msg.data.diversity;
            newJobApplication.sponsorship=msg.data.sponsorship;
            newJobApplication.disability = msg.data.disability;
            newJobApplication.resume= msg.data.resume;
            newJobApplication.cover_letter= msg.data.cover_letter;
            JobsModel.findOneAndUpdate(
            
                {_id : msg.jobId},
                {
                    $push :{ jobApplication : newJobApplication

                    }
                },
                function(err, res) {
                    if (err) {
                      console.log("unable to insert record");
                      res = "Error creating user";
                      callback(null, { success: false, status: "Job application push failed" });
                    }
                    console.log("Job application  document updated");
                   jobsModel
                  }
            );
           
            
            

        }
    }





    
};

exports.handle_request = handle_request;
