const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    minLength: [6, "Password too short"],
  },

  firstName: {
    type: String,
    required: true,
  },

});

module.exports = model("User", userSchema);