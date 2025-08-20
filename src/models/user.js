const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
});

//const User = mongoose.model("User", userSchema);

//module.exports = User; // Export the User model to use in other files

model.exports = mongoose.model("User", userSchema); // Export the User model to use in other files
