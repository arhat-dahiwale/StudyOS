// src/middleware/auth.middleware.ts
import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    })
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(
      token!,
      process.env.JWT_SECRET!
    ) as jwt.JwtPayload

    res.locals.user = decoded

    next()
  } catch {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    })
  }
}