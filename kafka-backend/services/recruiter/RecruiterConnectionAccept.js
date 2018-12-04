// Load Property model
const Recruiter = require('../../Model/Recruiter');

function handle_request(msg, callback) {
    console.log("KAFKA : RecruiteracceptConnection --> ", msg.email, msg.body);
    var res = {};
    
    Recruiter.update(
        {'email':msg.email},
        //{"$push":{"connections":{"acceptedFrom":msg.body.requestFrom}}},
        { "$pull":{"connectionsRequests":{"requestFrom":msg.body.requestFrom}}},
        { safe: true, multi:true }
        )
  .then(job => {
    if (!job) {
        res.code = 404 ;
        res.message = "Recruiter Connections not found" ;
        callback(null,res);
    }
    Recruiter.update(
        
        {'email':msg.body.requestFrom},
        //{"$push":{"connections":{"acceptedFrom":msg.body.requestFrom}}},
        { "$pull":{"connectionsRequests":{"requestFrom":msg.email}}},
        { safe: true, multi:true }
        
        )
    .then(job=>{
        if (!job) {
            res.code = 404 ;
            res.message = "Applicant Connections not found" ;
            callback(null,res);
        }
        Recruiter.update(
            {'email':msg.email},
            {"$push":{"connections":{"acceptedFrom":msg.body.requestFrom}}},
            
        
        )
  .then(job => {
    if (!job) {
        res.code = 404 ;
        res.message = "Applicant Connections not found" ;
        callback(null,res);
    }
    Recruiter.update(
        {'email':msg.body.requestFrom},
        {"$push":{"connections":{"acceptedFrom":msg.email}}}
    
        )
    .then(job=>{
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
    
})
})
.catch(function (err) {
    res.message = err;
    res.code = 400;
    callback(null, res);
});
   console.log("after callback" + res);
}


exports.handle_request = handle_request;
