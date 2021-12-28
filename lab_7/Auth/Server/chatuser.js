const mongoose = require('mongoose');

const schemaChatUser=new mongoose.Schema({
  username:{
    type: String,
    require: true,
    unique: true
  },
  password:{
    type: String,
    require: true,
  }
}, {versionKey: false});

const ChatUser = mongoose.model("ChatUser", schemaChatUser);
module.exports = ChatUser;
