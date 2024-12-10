import { NextFunction, Request, Response } from "express"
import ErrorHandler from "../utils/errorClass.js"

export const errorMiddleware = (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
  
  err.message = err.message ?? "Internal Server Error";
  err.statusCode = err.statusCode ?? 500;

  res.status(err.statusCode).json({ 
    success: false,
    statusCode: err.statusCode,
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });

}