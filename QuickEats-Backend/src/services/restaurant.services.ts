import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { uploadImageToCloudinary2 } from "../utils/cloudinary/uploadImageToCloudinary2.js";
import fs from "fs";
import RestaurantModel from "../models/restaurant.model.js";
import ErrorHandler from "../utils/errorClass.js";

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const uploadImages = async (restaurantName: string) => {
  try {
    const imageDirectoryPath = path.join(__dirname, '../../uploads');
    const files = fs.readdirSync(imageDirectoryPath);
    
    let counter = 0;
    let imagesArray = [];

    for (const image of files) {
      try {
        // Increment the counter for each image.
        counter++;

        // Construct the full path to the image file.
        const imageFile = path.join(imageDirectoryPath, image);
        
        const imageUrl = await uploadImageToCloudinary2(imageFile, restaurantName, "restaurant", counter);
        imagesArray.push(imageUrl?.secure_url)

      } catch (error) {
        console.error(`Error uploading ${image}: `, error);
      }
    }

    return imagesArray;

  } catch (error) {
    console.error("uploadImages error = ", error);
  }
}

type TRestaurantData = {
  city: string, 
  country: string, 
  cuisines: string[], 
  deliveryTime: number, 
  imageUrl: string, 
  menus: string[], 
  restaurantName: string
}

export const createRestaurant = async ( restaurantData: TRestaurantData, userId: string, images: (string | undefined)) => {
  try {
    const {city, country, cuisines, deliveryTime, menus, restaurantName } = restaurantData

    const restaurant = await RestaurantModel.create({
      user: userId,
      restaurantName,
      city,
      country,
      cuisines,
      deliveryTime,
      imageUrl: images,
    });
    
    if(!restaurant) throw new ErrorHandler(400, "Unable to create restaurant")
      
    return restaurant;
    
  } catch (error) {
    console.error("createRestaurant error = ", error);
    if(error instanceof ErrorHandler) throw error;
    throw new ErrorHandler(500, "Internal server error");
  }
}