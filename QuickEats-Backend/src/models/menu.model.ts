import mongoose from "mongoose";
import { TMenuDocument } from "../types/menu.type.js";

const menuSchema = new mongoose.Schema<TMenuDocument>({
  title: {
    type: String,
    required: true, // E.g., "Burgers", "Fries", "Drinks"
    trim: true,
  },
  description: {
    type: String,
    trim: true, // Optional section description, like "Our delicious range of burgers"
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant', // Reference to the restaurant this menu belongs to
    required: true,
  },
  menuItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MenuItem', // Reference to the MenuItem model
  }],

},{timestamps:true});


const MenuModel = mongoose.model<TMenuDocument>('Menu', menuSchema);

export default MenuModel;