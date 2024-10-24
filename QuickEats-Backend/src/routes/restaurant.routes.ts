import { Router } from "express"
import { createRestaurantHandler } from "../contorollers/restaurant.controllers.js";
// import { upload } from "../middlewares/multer.middleware.js";
import upload from "../middlewares/multer.middlewar2.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const route = Router();

route.post("/restaurant", [isAuthenticated, upload.single("file")], createRestaurantHandler);

export default route;