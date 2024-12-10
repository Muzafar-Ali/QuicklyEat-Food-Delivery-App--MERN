import { AnyZodObject } from 'zod';
import { Request, Response, NextFunction } from 'express';
import ErrorHandler from '../utils/errorClass.js';

function validateRequestData2(schema: AnyZodObject) {
  return function (req: Request, res: Response, next: NextFunction) {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!result.success) {
      const errorMessages = result.error.errors
        .map((err: { message: any }) => err.message)
        .join(", ");
      
      // Instead of throwing, pass the error to the next middleware
      return next(new ErrorHandler(400, `${errorMessages}`));  // Pass error to next() with `next(error)`
    }

    // If validation succeeds, assign validated data to the request
    req.body = result.data.body;
    req.query = result.data.query;
    req.params = result.data.params;

    next();  // Continue to the next middleware
  };
}

export default validateRequestData2;
