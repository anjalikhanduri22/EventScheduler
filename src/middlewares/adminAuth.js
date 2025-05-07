const jwt = require("jsonwebtoken");

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Please Login!");
    }

    const decodedObj = await jwt.verify(token, process.env.JWT_SECRET);

    if (
      decodedObj.role !== "Admin" &&
      decodedObj.approvalStatus !== "accepted"
    ) {
      return res.status(403).json({ message: "Access denied. " });
    }

    req.user = decodedObj;

    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = {
  adminAuth,
};
