import { MenuModel } from "../models/menu.model.js";
import mongoose from "mongoose";
import RestaurantModel from "../models/restaurant.model.js";
import ErrorHandler from "../utils/errorClass.js";

export const updateRestaurantMenus = async (id: string, _id: mongoose.Schema.Types.ObjectId) => {
  try {
    const restaurant = await RestaurantModel.findOne({user: id});
    if(!restaurant) throw new ErrorHandler(404, "Restaurant not found");

    const restaurantMenu = restaurant.menus as mongoose.Schema.Types.ObjectId[];
    restaurantMenu.push(_id);
    restaurant.menus = restaurantMenu;
    await restaurant.save();
    
  } catch (error) {
    console.error("updateRestaurantMenus error = ", error);
    throw error;
  }
}

