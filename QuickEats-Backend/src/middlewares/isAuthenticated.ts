import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

declare global {
  namespace Express{
    interface Request {
      id: string;
    }
  }
}

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;
 
    if (!token) {
      res.status(401).json({
        success: false,
        message: "User not authenticated"
      });

      return; 
    }

    const decode = jwt.verify(token, config.jwtSecretKey!) as jwt.JwtPayload;
    
    if (!decode) {
      res.status(401).json({
        success: false,
        message: "Invalid token"
      })

      return; 
    }

    req.id = decode.userId;
    next();
    
  } catch (error) {
    console.error(error);
    next(error)
  }
}