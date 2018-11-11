var mongoose = require("mongoose");

var messageSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  fromEmail: {
    type: String,
    required: true,
    lowercase: true,
    default: ""
  },
  toEmail: {
    type: String,
    lowercase: true,
    required: true,
    default: ""
  },
  fromMessage: {
    type: String,
    required: false,
    default: ""
  },
  toMessage: {
    type: String,
    required: false,
    default: ""
  }
});

module.exports = mongoose.model("Messages", messageSchema);
