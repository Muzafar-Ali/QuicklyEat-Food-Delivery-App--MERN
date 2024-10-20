import mongoose from "mongoose";
import { TMenuDocument } from "../types/menu.type.js";

const menuSchema = new mongoose.Schema<TMenuDocument>({
  name:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  image:{
    type:String,
    required:true
  },
},{timestamps:true});

export const MenuModel = mongoose.model<TMenuDocument>("Menu", menuSchema);