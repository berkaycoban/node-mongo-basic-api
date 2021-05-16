const mongoose = require("mongoose");
mongoose.connect(`mongodb://localhost:27017/people`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  gender: String,
  email: String,
  username: String,
  name: {
    title: String,
    first: String,
    last: String,
  },
});

module.exports = mongoose.model("User", userSchema);

/*
  mongoimport --db people --collection users --jsonArray users.js
*/
