import mongoose from "mongoose";

export type TMenu = {
  name: string;      // E.g., "Burgers", "Fries", "Drinks"
  description?: string;
  image: string;           
  restaurant: mongoose.Schema.Types.ObjectId;  
  menuItems: mongoose.Schema.Types.ObjectId[]; 
}

export type TMenuDocument = TMenu & mongoose.Document & {
  createdAt:Date;
  updatedAt:Date;
}

export type TMenuItem = {
  title: string;          // Name of the dish
  price: number;               
  description: string;    
  image: string;               
  menu: mongoose.Schema.Types.ObjectId;            
}

export type TMenuItemDocument = TMenuItem & mongoose.Document & {
  createdAt:Date;
  updatedAt:Date;
}