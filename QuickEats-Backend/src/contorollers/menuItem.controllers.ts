import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorClass.js";
import MenuItemModel from "../models/menuItem.model.js";
import uploadImageToCloudinary from "../utils/cloudinary/uploadImageToCloudinary.js";
import MenuModel from "../models/menu.model.js";


export const createMenuItemHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {title, price, description, menu} = req.body;
    const image = req.file;   
    console.log('menu', menu);
    
    if(!title || !price || !description || !menu ) throw new ErrorHandler(400, "All fields are required");
    if(!image) throw new ErrorHandler(400, "Please upload a restaurant image");
    
    const subFolder = "menuItem"
    const imageUrl = await uploadImageToCloudinary(image, title, subFolder);

    const menuItem = await MenuItemModel.create({
      title,
      price,
      description,
      image: imageUrl,
      menu
    })

    const menus = await MenuModel.findByIdAndUpdate(menu, {
      $push: {menuItems: menuItem._id}
    });

    if(!menuItem) throw new ErrorHandler(500, "Failed to create menu Item");
    
    res.status(201).json({
      success: true,
      message: "Menu Item created successfully",
      menuItem
    })
    
  } catch (error) {
    console.error("createMnuItemHandler error = ", error);
    next(error)
  }
}