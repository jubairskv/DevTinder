const jwt = require("jsonwebtoken");
const User = require("../models/user");

// const AuthAdmin = (req, res, next) => {
//   console.log("Admin Middleware called");
//   //res.send("Response from admin middleware");
//   const token = "xyzzzz";
//   const isAdmin = token === "xyzzzz"; // Example check for admin token
//   if (!isAdmin) {
//     res.status(401).send("Unauthorized");
//   } else {
//     next();
//   }
// };

// const AuthUser = (req, res, next) => {
//   console.log("user Middleware called");
//   //res.send("Response from admin middleware");
//   const token = "xyzzzz";
//   const isAdmin = token === "xyzzzz"; // Example check for admin token
//   if (!isAdmin) {
//     res.status(401).send("Unauthorized");
//   } else {
//     next();
//   }
// };

// module.exports = { AuthAdmin, AuthUser };

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Token is not Valid!!!");
    }
    const decode = await jwt.verify(token, "@Dev12345");
    const { _id } = decode;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("Error: " + err.message);
  }
};

module.exports = { userAuth };
