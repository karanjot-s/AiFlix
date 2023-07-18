const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET_KEY || "abc123";

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.userId = decoded.userId;
    next();
  });
};

// Hash the password
const hash = async (str) => {
  return await bcrypt.hash(str, 10);
};

// Compare unhashed password with hashed password
const compare = async (str1, str2) => {
  return await bcrypt.compare(str1, str2);
};

// Generate a signed JWT Token
const sign = (id) => {
  return jwt.sign({ userId: id }, SECRET_KEY);
};

module.exports = { verifyToken, hash, compare, sign };
