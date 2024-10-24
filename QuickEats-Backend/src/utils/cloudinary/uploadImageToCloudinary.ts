import { v2 as cloudinary } from "cloudinary";
import config from "../../config/config.js";
import { retryCloudinaryUpload } from "./retryCloudinaryUpload.js";

  // Configuration
  cloudinary.config({
    cloud_name: config.cloudinaryCloudName,
    api_key: config.cloudinaryKey,
    api_secret: config.cloudinarySeceret,
  });
  
  
  export const uploadImageToCloudinary = async (imagePath: string, title: string, subfolderCategory: string, counter: number) => {
    try {
      
      if(!imagePath) throw new Error("no image available to upload");
      
      // Folder structure setup for cloudinary
      const baseFolder = "QuickEats";
      let subFolder = subfolderCategory;
      const slug = title.toLowerCase().split(" ").join("-");
      
      // Combine the base folder, subfolder, and the product name to form the complete folder path
      const publicId = `${baseFolder}/${subFolder}/${slug}`; // Include the product name in the folder path

      const result = await retryCloudinaryUpload(imagePath, {
        resource_type: "auto",
        public_id: `image${counter}`,
        folder: publicId,
      });

      return result;
      
      
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      return null;
    }
  }