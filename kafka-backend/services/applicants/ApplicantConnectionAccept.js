// Load Property model
const Applicants = require('../../Model/Applicant');



exports.handle_request = function handle_request(msg, callback) {
    switch (msg.path) {
      case "acceptConnectionPush":
        handlepush(msg, callback);
        break;
      case "acceptConnectionPull":
        handlepull(msg, callback);
        break;
          
    }
  };
  




function handlepush(msg, callback) {
    console.log("KAFKA : acceptConnection Handle push--> ", msg.email, msg.body.requestFrom);
    var res = {};
    Applicants.findOneAndUpdate(
        {'email':msg.email},
        {'$push':{"connections":{"acceptedFrom":msg.body.requestFrom}}}
        )
  .then(job => {
    if (!job) {
        res.code = 404 ;
        res.message = "Applicant Connections not found" ;
        callback(null,res);
    }
    console.log("UPDATE push success with result: ",job);
    
    
    res.code = 200 ;
    res.message = job ;
    callback(null,res);
    })
    .catch(err => {
        console.log("errored in push with ", err);
        callback(null,"error");
    }

    

    

    )
    
}




function handlepull(msg, callback) {
    console.log("KAFKA : acceptConnection Handle push--> ", msg.email, msg.body.requestFrom);
    var res = {};


    Applicants.update(
        {'email':msg.email},
        //{"$push":{"connections":{"acceptedFrom":msg.body.requestFrom}}},
        { $pull:{"connectionsRequests":{"requestFrom":msg.body.requestFrom}}},
        { multi:true }
        
        )
    
    
  .then(job => {
    if (!job) {
        res.code = 404 ;
        res.message = "Applicant Connections not found" ;
        callback(null,res);
    }
    console.log("UPDATE pull success with result: ",job);
    
    
    res.code = 200 ;
    res.message = job ;
    callback(null,res);
    })
    .catch(err => {
        console.log("errored in pull with ", err);
        callback(null,"error");
    }

    

    

    )
    
}

