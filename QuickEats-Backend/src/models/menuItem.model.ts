import mongoose from "mongoose";
import { TMenuItemDocument } from "../types/menu.type.js";

const menuItemSchema = new mongoose.Schema<TMenuItemDocument>({
  title: {
    type: String,
    required: true, // Name of the dish
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true, // Short description of the item
    trim: true,
  },
  image: {
    type: String, 
    required: true,
  },
  menu: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Menu', 
    required: true,
  }
  
},{timestamps:true});


const MenuItemModel = mongoose.model<TMenuItemDocument>('MenuItem', menuItemSchema);

export default MenuItemModel;
