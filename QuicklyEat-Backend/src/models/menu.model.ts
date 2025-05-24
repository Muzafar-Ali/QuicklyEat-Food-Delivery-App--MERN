import mongoose from "mongoose";
import { TMenuDocument } from "../types/menu.type.js";

const menuSchema = new mongoose.Schema<TMenuDocument>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  menuItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MenuItem',
  }],

},{ timestamps: true });


const MenuModel = mongoose.model<TMenuDocument>('Menu', menuSchema);

export default MenuModel;