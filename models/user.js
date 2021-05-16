const mongoose = require("./mongo");

const userSchema = new mongoose.Schema({
  gender: String,
  email: String,
  username: String,
  name: {
    title: String,
    first: String,
    last: String,
  },
  fullName: String,
});

module.exports = mongoose.model("User", userSchema);

/*
  mongoimport --db people --collection users --jsonArray users.js
*/
