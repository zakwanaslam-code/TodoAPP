import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token, access denied" });
    }

    const token = authHeader.split(" ")[1]; // Bearer token

    const decoded = jwt.verify(token, "secretkey");

    req.user = decoded; // user info attach

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};