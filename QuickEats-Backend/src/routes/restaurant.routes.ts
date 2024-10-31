import { Router } from "express"
import { 
  createRestaurantHandler, 
  getRestaurantHandler, 
  getRestaurantOrderHandler, 
  searchRestaurantHandler, 
  updateRestaurantHandler 
} from "../contorollers/restaurant.controllers.js";
// import { upload } from "../middlewares/multer.middleware.js";
import upload from "../middlewares/multer.middlewar2.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import validateRequestData from "../middlewares/validateRequestData.js";
import restaurantSchema, { updateRestaurantSchema } from "../schema/restaurant.schema.js";

const route = Router();

route.post("/", [isAuthenticated, upload.single("image")], validateRequestData(restaurantSchema),  createRestaurantHandler);
route.get("/", isAuthenticated, getRestaurantHandler);
route.put("/", [isAuthenticated, upload.single("image"), validateRequestData(updateRestaurantSchema)], updateRestaurantHandler);
route.get("/order", isAuthenticated, getRestaurantOrderHandler);
route.get("/search/:searchText", searchRestaurantHandler);

export default route;