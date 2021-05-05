const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  subscription: {
    type: String,
    default: 'common'
  },

  token: {
    type: String,
  },

  verificationToken: {
    type: String,
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;