const AuthAdmin = (req, res, next) => {
  console.log("Admin Middleware called");
  //res.send("Response from admin middleware");
  const token = "xyzzzz";
  const isAdmin = token === "xyzzzz"; // Example check for admin token
  if (!isAdmin) {
    res.status(401).send("Unauthorized");
  } else {
    next();
  }
};

const AuthUser = (req, res, next) => {
  console.log("user Middleware called");
  //res.send("Response from admin middleware");
  const token = "xyzzzz";
  const isAdmin = token === "xyzzzz"; // Example check for admin token
  if (!isAdmin) {
    res.status(401).send("Unauthorized");
  } else {
    next();
  }
};

module.exports = { AuthAdmin, AuthUser };
