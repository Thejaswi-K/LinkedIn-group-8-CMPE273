var connection = new require("./kafka/Connection");
var { mongoose } = require("./db/mongo");
//topics files
//var signin = require('./services/signin.js');

var receiveMessage = require("./services/applicants/receiveMessage");

//topics files
//var signin = require('./services/signin.js');
var Log = require("./services/logs.js");
var Job = require("./services/jobs.js");
var ApplicantDetails = require("./services/applicants/applicantViewProfile");
var RecruiterDetails = require("./services/recruiter/recruiterViewProfile");
var ApplicantLogin = require("./services/applicants/applicantLogin");
var RecruiterLogin = require("./services/recruiter/recruiterLogin");
var ApplicantSignup = require("./services/applicants/applicantSignup");
var ApplicantSignupMongo = require("./services/applicants/applicantSignupMongo");
var RecruiterSignup = require("./services/recruiter/recruiterSignup");
var ApplicantUpdateProfile = require("./services/applicants/applicantUpdateProfile");
var RecruiterUpdateProfile = require("./services/recruiter/recruiterUpdateProfile");
var ApplicantDelete = require("./services/applicants/applicantDelete");
var RecruiterDelete = require("./services/recruiter/recruiterDelete");
var Applicant = require("./services/applicants/applicants.js");
var RecruiterJobView = require("./services/recruiter/recruiterViewJobById");
var RecruiterJobUpdate = require("./services/recruiter/recruiterUpdateJob");
var sendMessage = require("./services/applicants/sendMessage");
var applicantMessages = require("./services/applicants/applicantMessages");

function handleTopicRequest(topic_name, fname) {
  //var topic_name = 'root_topic';
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log("server is running ");
  consumer.on("message", function(message) {
    console.log("message received for " + topic_name + " ", fname);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    fname.handle_request(data.data, function(err, res) {
      console.log("after handle" + res);
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
      producer.send(payloads, function(err, data) {
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
handleTopicRequest("applicant_signup_mongo", ApplicantSignupMongo);
handleTopicRequest("recruiter_signup", RecruiterSignup);
handleTopicRequest("applicant_update_profile", ApplicantUpdateProfile);
handleTopicRequest("recruiter_update_profile", RecruiterUpdateProfile);
handleTopicRequest("applicant_delete", ApplicantDelete);
handleTopicRequest("applicant_topic", Applicant);
handleTopicRequest("send_message", sendMessage);
handleTopicRequest("receive_message", receiveMessage);
// handleTopicRequest("recruiter_JobView",RecruiterJobView);
// handleTopicRequest("recruiter_JobUpdate",RecruiterJobUpdate);
handleTopicRequest("recruiter_delete", RecruiterDelete);
handleTopicRequest("recruiter_JobView", RecruiterJobView);
handleTopicRequest("recruiter_JobUpdate", RecruiterJobUpdate);
handleTopicRequest("applicant_messages", applicantMessages);

/*

Run the topics using

//Change port between 2181(default) / 2183 depending on compatability 

(bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic logs_topic; 
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic jobs_topic; 
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic applicant_details;
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic recruiter_details;
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic applicant_login;
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic recruiter_login;
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic applicant_signup; 
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic recruiter_signup;
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic applicant_update_profile;
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic recruiter_update_profile;
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic applicant_delete;
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic recruiter_delete;
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic applicant_topic;
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic recruiter_JobView;
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic recruiter_JobUpdate;) &



*/
