const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phoneNumber: String,
  dob: Date,
  email: String,
});

module.exports = mongoose.model("User", userSchema);
