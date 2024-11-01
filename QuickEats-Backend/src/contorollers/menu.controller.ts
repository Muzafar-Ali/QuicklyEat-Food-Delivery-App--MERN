import { NextFunction, Request, Response } from "express";
import { MenuModel } from "../models/menu.model.js";
import { TId, TMenu } from "../schema/menu.schema.js";
import { updateRestaurantMenus } from "../services/menu.services.js";
import { replaceImageOnCloudinary } from "../utils/cloudinary/replaceImageOnCloudinary.js";
import { deleteImageFromCloudinary } from "../utils/cloudinary/deleteImageFromCloudinary.js";
import RestaurantModel from "../models/restaurant.model.js";
import ErrorHandler from "../utils/errorClass.js";
import uploadImageToCloudinary from "../utils/cloudinary/uploadImageToCloudinary.js";

export const createMenuHandler = async (req: Request<{}, {}, TMenu["body"]>, res: Response, next: NextFunction) => {
  try {
    const userId = req.id;
    const {name, price, description} = req.body;
    const file = req.file;

    if(!file) throw new ErrorHandler(400, "Image is required");

    const imageUrl = await uploadImageToCloudinary(file, name, "menu");
    if(!imageUrl) throw new ErrorHandler(500, "Failed to upload image");

    // create menu
    const menu = await MenuModel.create({
      name, 
      price, 
      description,
      image: imageUrl
    });
    if(!menu) throw new ErrorHandler(500, "Failed to create menu");
      
    // update menus in restaurant model
    await updateRestaurantMenus( userId, menu._id)
   
    res.status(201).json({
      success: true,
      message: "Menu created successfully",
      menu
    })

  } catch (error) {
    console.error("createMenuHandler error = ", error);
    next(error)
  }
}
 
export const getMenuHandler = async (req: Request, res: Response, next: NextFunction) => {
 try {
  const userId = req.id;

  const restaurant = await RestaurantModel.findOne({user: userId}).populate("menus"); 
  if(!restaurant) throw new ErrorHandler(404, "Restaurant not found");
  if(!restaurant.menus) throw new ErrorHandler(404, "Menu not found");
  
  res.status(200).json({
    success: true,
    message: "Menu fetched successfully",
    menu: restaurant.menus,
  })
 
 } catch (error) {
  console.error("getMenuHandler error = ", error);
  next(error)
 }
}

export const updateMenuHandler = async (req: Request<TId["params"]>, res: Response, next: NextFunction) => {
  try {
    const menuId = req.params.id;
    const {name, price, description} = req.body;
    const file = req.file;   

    // Create an update object only with provided fields
    const updateData: any = {};
    if (name) updateData.name = name;
    if (price) updateData.price = price;
    if (description) updateData.description = description;

    // update menu image
    if(file) {
      if(!name) throw new ErrorHandler(400, "Menu Title name is required when uploading image ");
      const extractedPublicId = await MenuModel.findOne({_id: menuId}).select("image")
      const subFolder = "menu"
      
      const imageUrl = await replaceImageOnCloudinary(extractedPublicId!, name, file, subFolder)
      updateData.image = imageUrl;
    }
    
    // update menu
    const menu = await MenuModel.findByIdAndUpdate(menuId, updateData, {new: true});
    if(!menu) throw new ErrorHandler(404, "Menu not found");
    
    res.status(200).json({
      success: true,
      message: "Menu updated successfully",
      menu
    })

  } catch (error) {
    console.error("updateMenuHandler error = ", error);
    next(error)
  }
}

export const deleteMenuHandler = async (req: Request<TId["params"]>, res: Response, next: NextFunction) => {
  try {
    const menuId = req.params.id;

    const menu = await MenuModel.findById(menuId);    
    if(!menu) throw new ErrorHandler(404, "Menu not found");

    // delete image from cloudinary
    const extractedPublicId = await MenuModel.findOne({_id: menuId}).select("image")
    await deleteImageFromCloudinary(extractedPublicId);

    // delete menu from database
    const deleteResult = await menu.deleteOne();
    if(!deleteResult.acknowledged) throw new ErrorHandler(500, "Failed to send delete menu, Operation not acknowledged");
    if(deleteResult.deletedCount === 0) throw new ErrorHandler(404, "Menu not found");

    // remove menu from restaurant menus array
    const updateRestaurantMenus = await RestaurantModel.findOneAndUpdate(
      { menus: menuId },
      { $pull: { menus: menuId } }, // Remove the menu ID from the restaurant's menus array
      { new: true }
    );
    if(!updateRestaurantMenus) throw new ErrorHandler(404, "Restaurant menu not found");
    
    res.status(200).json({
      success: true,
      message: "Menu deleted successfully",
    })
    
  } catch (error) {
    console.error("deleteMenuHandler error = ", error);
    next(error)
  }
}
