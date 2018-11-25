//Load Messages Model
const Messages = require("../../Model/Messages");

function handle_request(msg, callback) {
  var res = {};
<<<<<<< HEAD
  //   console.log("In handle request:" + JSON.stringify(msg));
  console.log(msg.from_email);
=======
  console.log("In handle request:" + JSON.stringify(msg));
>>>>>>> f4800e38abfed8968f833f14f90aba4ca84ff7c3

  Messages.find({ messageMembers: msg.from_email })
    .then(messages => {
      if (!messages) {
        console.log("No conversation between the users");
        res.value = "No conversation between the users";
        res.status = "400";
        console.log(messages);
        console.log(messages.authorMessage.author);
        callback(null, res);
      }
      console.log("Conversation present between the users");
      //   console.log(messages.messageMembers);
      console.log(messages);
      callback(null, messages);
    })

    .catch(err => callback(err, "Getting Conversation failed"));
}

exports.handle_request = handle_request;
