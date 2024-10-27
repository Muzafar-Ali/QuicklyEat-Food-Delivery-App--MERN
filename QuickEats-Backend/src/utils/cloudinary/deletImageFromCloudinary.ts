import { v2 as cloudinary } from "cloudinary";
import config from "../../config/config.js";

  // Configuration
  cloudinary.config({
    cloud_name: config.cloudinaryCloudName,
    api_key: config.cloudinaryKey,
    api_secret: config.cloudinarySeceret,
  });
  


  const deleteImageAndSubfolderFromCloudinary = async (folderPath: string) => {
    try {
      // Delete all resources under the specified folder
      const deleteResponse = await cloudinary.api.delete_resources_by_prefix(folderPath);     
      
      // Check if images were deleted
      if (deleteResponse.deleted && Object.keys(deleteResponse.deleted). length > 0) {
        // Now delete the folder itself if empty
        const folderDeletionResponse = await cloudinary.api.delete_folder(folderPath);
        if(folderDeletionResponse.deleted.length === 0) throw new Error('Failed to delete folder');

        return { message: "Folder and its images deleted successfully" };
      } else {
        throw new Error('No images found to delete');
      }
    } catch (error) {
      console.error("deleteImageAndSubfolderFromCloudinary error =", error);
      throw error;   
    }
  };
  
  export default deleteImageAndSubfolderFromCloudinary;