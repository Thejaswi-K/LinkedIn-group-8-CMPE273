var connection =  new require('./kafka/Connection');
var {mongoose} = require("./db/mongo");

//topics files
//var signin = require('./services/signin.js');
var Log = require('./services/logs.js');
var Job = require('./services/jobs.js');
var ApplicantDetails = require('./services/applicants/applicantViewProfile');
var RecruiterDetails = require('./services/recruiter/recruiterViewProfile');
var ApplicantLogin = require('./services/applicants/applicantLogin');
var RecruiterLogin = require('./services/recruiter/recruiterLogin');
var ApplicantSignup = require('./services/applicants/applicantSignup');
var RecruiterSignup = require('./services/recruiter/recruiterSignup');
var ApplicantUpdateProfile = require('./services/applicants/applicantUpdateProfile');
var RecruiterUpdateProfile = require('./services/recruiter/recruiterUpdateProfile');
var ApplicantDelete = require('./services/applicants/applicantDelete');
var RecruiterDelete = require('./services/recruiter/recruiterDelete');
var Job = require('./services/jobs.js');
var Applicant = require('./services/applicants/applicants.js');

function handleTopicRequest(topic_name, fname) {
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name + " ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);

        fname.handle_request(data.data, function (err, res) {
            console.log('after handle' + res);
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                console.log(data);
            });
            return;
        });

    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request

handleTopicRequest("logs_topic", Log);
handleTopicRequest("jobs_topic", Job);
handleTopicRequest("applicant_details", ApplicantDetails);
handleTopicRequest("recruiter_details", RecruiterDetails);
handleTopicRequest("applicant_login", ApplicantLogin);
handleTopicRequest("recruiter_login", RecruiterLogin);
handleTopicRequest("applicant_signup", ApplicantSignup);
handleTopicRequest("recruiter_signup", RecruiterSignup);
handleTopicRequest("applicant_update_profile", ApplicantUpdateProfile);
handleTopicRequest("recruiter_update_profile", RecruiterUpdateProfile);
handleTopicRequest("applicant_delete", ApplicantDelete);
handleTopicRequest("recruiter_delete", RecruiterDelete);
handleTopicRequest("applicant_topic",Applicant);
// handleTopicRequest("recruiter_JobView",RecruiterJobView);
// handleTopicRequest("recruiter_JobUpdate",RecruiterJobUpdate);

