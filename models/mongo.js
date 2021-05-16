const mongoose = require("mongoose");
mongoose.connect(`mongodb://localhost:27017/people`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

module.exports = mongoose;
