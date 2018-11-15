//Load Messages Model
const Messages = require("../../Model/Messages");

function handle_request(msg, callback) {
  var res = {};
  console.log("In handle request:" + JSON.stringify(msg));

  var members = [msg.from_email, msg.to_email];

  Messages.findOne({
    messageMembers: { $all: ["msg.from_email", "msg.to_email"] }
  }).then(user => {
    if (!user) {
      const newMessage = new Messages({
        members: members,
        authorMessage: [
          {
            author: msg.from_email,
            message: msg.sendMessage
          }
        ]
      });
      newMessage.save().then(
        message => {
          console.log("Message send to desired User: ", message);
          res.status = "200";
          res.value = "Success Sending Message to desired User";
          callback(null, res);
        },
        err => {
          console.log("Error Sending Message");
          console.log(err);
          res.code = "400";
          res.value = "Unsuccessfull";
          callback(err, "Message not send properly");
        }
      );
    } else {
      Messages.findOneAndUpdate(
        { messageMembers: { $all: ["msg.from_email", "msg.to_email"] } },
        {
          $push: {
            authorMessage: [
              {
                author: msg.from_email,
                message: msg.sendMessage
              }
            ]
          }
        }
      ).then(
        message => {
          console.log("Message send to desired User: ", message);
          res.status = "200";
          res.value = "Success Sending Message to desired User";
          callback(null, res);
        },
        err => {
          console.log("Error Sending Message");
          console.log(err);
          res.code = "400";
          res.value = "Unsuccessfull";
          callback(err, "Message not send properly");
        }
      );
    }
  });
}

exports.handle_request = handle_request;
