import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorClass.js";
import MenuItemModel from "../models/menuItem.model.js";

export const createMenuItemHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {title, price, description, menu} = req.body;
    console.log('req.body', req.body);
    
    const file = req.file;   

    if(!title || !price || !description || !menu ) throw new ErrorHandler(400, "All fields are required");
    // const subFolder = "menu"
    // const imageUrl = await uploadImageOnCloudinary(name, file, subFolder)

    const menuItem = await MenuItemModel.create({
      title,
      price,
      description,
      image: "https://images.deliveryhero.io/image/fd-pk/Products/50073.jpg??width=500",
      menu
    })
    console.log('menuItem', menuItem);

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