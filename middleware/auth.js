const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    // Check if Authorization header exists
    if (!authHeader) {
      return res.status(401).json({
        message: "No Authorization header found"
      });
    }

    // Expected format: Bearer <token>
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "No token provided"
      });
    }

    // Debug logs
    console.log("Authorization Header:", authHeader);
    console.log("Token:", token);
    console.log("JWT Secret:", process.env.JWT_SECRET);

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    req.user = verified;
    next();

  } catch (error) {
    console.log("JWT Error:", error.message);

    return res.status(401).json({
      message: error.message
    });
  }
};

module.exports = auth;