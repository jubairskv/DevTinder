const mongoose = require("mongoose");
const validator = require("validator"); // Import the validator library for additional validation

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String, // First name is a string data type
      required: true, // First name is required user will not be created without it Mongoose wont allow it
      minLength: 4, // Minimum length of 2 characters for first name
      maxLength: 50, // Maximum length of 30 characters for first name
    },
    lastName: {
      type: String,
    },
    emailId: {
      //Schema Types for validation -> Reference: https://mongoosejs.com/docs/schematypes.html for more details on schema types
      type: String,
      required: true,
      unique: true, // Ensure email is unique across users
      lowercase: true, // Convert email to lowercase before saving (helps with uniqueness)
      trim: true, // Remove whitespace from both ends of the email
      //match: [/\S+@\S+\.\S+/, "Invalid email format"], // Basic email format validation
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address: " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a strong password: " + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18, // Minimum age of 18 years
      max: 100, // Maximum age of 100 years
    },
    gender: {
      type: String,
      validate(value) {
        // it will work only when we create new document or if we use runValidators:true in update method
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Gender is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid photo address: " + value);
        }
      },
    },
    about: {
      type: String,
      default: "this is default about of the user", // Default about text if user does not provide one
    },
    skills: {
      type: [String], // Array of strings to store multiple skills
    },
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

//const User = mongoose.model("User", userSchema);

//module.exports = User; // Export the User model to use in other files

module.exports = mongoose.model("User", userSchema); // Export the User model to use in other files
