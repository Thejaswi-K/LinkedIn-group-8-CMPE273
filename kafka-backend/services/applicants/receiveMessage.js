//Load Messages Model
const Messages = require("../../Model/Messages");

function handle_request(msg, callback) {
  var res = {};
  console.log("In handle request:" + JSON.stringify(msg));

<<<<<<< HEAD
  Messages.findOne({ messageMembers: { $all: [msg.from_email, msg.to_email] } })
=======
  Messages.find({ messageMembers: { $all: [msg.from_email, msg.to_email] } })
>>>>>>> f4800e38abfed8968f833f14f90aba4ca84ff7c3
    .then(messages => {
      if (!messages) {
        console.log("No conversation between the users");
        res.value = "No conversation between the users";
        res.status = "400";
        callback(null, res);
      }
      console.log("Conversation present between the users");
      console.log(messages);
      callback(null, messages);
    })

    .catch(err => callback(err, "Getting Conversation failed"));
}

exports.handle_request = handle_request;
