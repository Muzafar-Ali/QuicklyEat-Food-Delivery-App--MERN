import { AnyZodObject } from 'zod'; // Assuming `AnyZodObject` is correctly imported
import { Request, Response, NextFunction } from 'express';
import ErrorHandler from '../utils/errorClass.js';

function validateRequestData(schema: AnyZodObject) {
  return function (req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);
      const result = schema.safeParse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      
  
       if(!result.success) {
        const errorMessages = result.error.errors.map((err: {message: any}) => err.message).join(", ");
        throw new ErrorHandler(400, `${errorMessages}`);  
      }
  
      // if (!result.success) {
      //   // Extract error messages from the validation result
      //   const messages = result.error.errors.map((item) => item.message);
      //   res.status(400).json({ errors: messages });
  
      //   return;
      // }
  
      // If validation succeeds, assign validated data to the request
      req.body = result.data.body;
      req.query = result.data.query;
      req.params = result.data.params;
  
      next();

    } catch (error) {
      console.error("validateRequestData error = ", error);
      next(error);
      
    }
  };
}

export default validateRequestData;
