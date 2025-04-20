require("dotenv").config();
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).json({
      status: false,
      message: "Access Token Needed",
    });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        status: false,
        message: "Unauthorized",
      });
    }
    req.user = {
      id: user.id,
      name: user.name,
      username: user.username,
      role: user.role,
    };
    next();
  });
}

function isAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      status: false,
      message: "Unauthorized",
    });
  }
  next();
}

module.exports = {
  verifyToken,
  isAdmin,
};
