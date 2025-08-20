const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(             // devTiner is database name to connect to partcular database
    "mongodb+srv://jubairk:X53SwsPJUifU5weH@cluster0.n9xubax.mongodb.net/devTinder"
  );
};

module.exports = connectDB; // Export the connectDB function to use in other files

