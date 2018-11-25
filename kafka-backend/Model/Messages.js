const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  messageMembers: {
    type: Array,
    required: false,
    lowercase: true,
    default: []
  },

  authorMessage: [
    {
      author: {
        type: String,
        required: false,
        lowercase: true,
        default: ""
      },
      message: {
        type: String,
        required: false,
        lowercase: true,
        default: ""
      }
    }
  ]
});

module.exports = mongoose.model("Messages", messageSchema);
