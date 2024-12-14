import { Router } from "express";
import { 
  addFavouriteHandler, 
  deleteFavouriteHandler, 
  forgotPasswordHandler, 
  getFavouriteHandler, 
  loginHanlder, 
  logoutHandler, 
  resetPasswordhandler, 
  signupHandler, 
  updateProfileHandler, 
  verifyEmailHandler } from "../contorollers/user.controller.js";
import createRateLimiter from "../utils/createRateLimiter.js";
import validateRequestData from "../middlewares/validateRequestData.js";
import userSchema, { loginSchema, userUpdateSchema, verifyEmailSchema } from "../schema/user.schema.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.middlewar2.js";

const route = Router();

// 5 request per minute
const signupRateLimiter = createRateLimiter(5, 60 * 1000, "Too many signup attempts. Please try again later."); 
const loginRateLimiter = createRateLimiter(5, 60 * 1000, "Too many login attempts. Please try again later."); 

route.post('/signup', [validateRequestData(userSchema), signupRateLimiter], signupHandler);
route.post('/login',  [validateRequestData(loginSchema), loginRateLimiter], loginHanlder);
route.post('/verify', validateRequestData(verifyEmailSchema), verifyEmailHandler);
route.post('/forgot-password', forgotPasswordHandler)
route.post('/reset-password/:resteToken', resetPasswordhandler)
route.post('/logout', logoutHandler)
route.post('/favourite', isAuthenticated, addFavouriteHandler)
route.get('/favourite', isAuthenticated, getFavouriteHandler)
route.delete('/favourite/:restaurantId', isAuthenticated, deleteFavouriteHandler)
route.put("/update", [isAuthenticated, validateRequestData(userUpdateSchema), upload.single("image")], updateProfileHandler);

export default route;