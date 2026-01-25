import { verifyToken } from "../utils/jwt.js";
import { User } from "../models/user.model.js";

export const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const payload = verifyToken(token);

    const user = await User.findById(payload.userId).select("-passwordHash");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; // attach user to request
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
