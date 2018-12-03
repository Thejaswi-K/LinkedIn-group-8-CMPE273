// Load Property model
const Applicants = require('../../Model/Applicant');

function handle_request(msg, callback) {
    console.log("KAFKA : viewApplicantConnections --> ", msg.email, msg.body);
    var res = {};
    
    Applicants.update(
        {'email':msg.email},
        {$push:{ 'connectionsRequests':[
          {'requestFrom':msg.body.requestFrom,'requestTo':msg.body.requestTo, 'isAccepted':false}
        ]
      }
    })
  .then(job => {
    if (!job) {
        res.code = 404 ;
        res.message = "Applicant Connections not found" ;
        callback(null,res);
    }
    Applicants.update(
        {'email':msg.body.requestFrom},
        {$push:{ 'connectionsRequests':[
          {'requestFrom':msg.email, 'isAccepted':false}
        ]
      }
    })
  .then(job => {
    if (!job) {
        res.code = 404 ;
        res.message = "Applicant Connections not found" ;
        callback(null,res);
    }
    res.code = 200 ;
    res.message = job ;
    callback(null,res);
})
})
.catch(function (err) {
    res.message = err;
    res.code = 400;
    callback(null, res);
});
   console.log("after callback" + res);
};


exports.handle_request = handle_request;
