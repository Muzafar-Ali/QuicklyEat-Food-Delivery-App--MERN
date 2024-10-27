import { MenuModel } from "../models/menu.model.js";
import mongoose from "mongoose";
import RestaurantModel from "../models/restaurant.model.js";
import ErrorHandler from "../utils/errorClass.js";
import uploadImageToCloudinary from "../utils/cloudinary/uploadImageToCloudinary.js";
import getFullPublicIdFromUrl from "../utils/getFullPublicIdFromUrl.js";
import deleteImageAndSubfolderFromCloudinary  from "../utils/cloudinary/deletImageFromCloudinary.js";

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

export const updateMenuImage = async (menuId: string, name: string, file: Express.Multer.File) => {
  try {
    const extractedPublicId = await MenuModel.findOne({_id: menuId}).select("image")
    const existingPublicId = getFullPublicIdFromUrl(extractedPublicId?.image)
    if(!existingPublicId) throw new ErrorHandler(500, "Failed to extract public id from url");
    
    const imageUrl = await uploadImageToCloudinary(
      file, 
      name, 
      "menu", 
      existingPublicId.folderPath!, 
      existingPublicId.publicId
    );
    
    if(!imageUrl) throw new ErrorHandler(500, "Failed to upload image");     
    return imageUrl;
    
  } catch (error) {
    console.error("updateMenuImage error = ", error);
    throw error;
  }
}

export const deleteMenuImage = async (menuId: string) => {
  try {
    const extractedPublicId = await MenuModel.findOne({_id: menuId}).select("image")

    const existingPublicId = getFullPublicIdFromUrl(extractedPublicId?.image)
    if(!existingPublicId) throw new ErrorHandler(500, "Failed to extract public id from url");
    
    const result = await deleteImageAndSubfolderFromCloudinary(existingPublicId.folderPath!);   
    if(!result) throw new ErrorHandler(500, "Failed to delet Folder and its images"); 
   
    return result;
    
  } catch (error) {
    console.error("updateMenuImage error = ", error);
    throw error;
  }
}

