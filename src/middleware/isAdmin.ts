import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }

  if (decoded.role !== "ADMIN") {
    return res.status(403).json({ success: false, message: "Forbidden: Admin only" });
  }

  // Inject user info to req object
  (req as any).user = decoded;

  next();
};
