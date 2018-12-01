// Load Property model
const Applicants = require('../../Model/Applicant');


function handle_request(msg, callback) {
    console.log("KAFKA : search Profile --> ", msg.body);
    var res = {};
    
    Applicants.find({firstName:msg.firstName})
  .then(profile => {
    if (!profile) {
        res.code = 404 ;
        res.message = "No Profile found" ;
        callback(null,res);
    }
    
    callback(null,profile);
})
.catch(function (err) {
    res.message = err;
    res.code = 400;
    callback(null, res);
});
   console.log("after callback" + res);
};


exports.handle_request = handle_request;
