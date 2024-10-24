import { v2 as cloudinary } from "cloudinary";
import config from "../../config/config.js";

  // Configuration
  cloudinary.config({
    cloud_name: config.cloudinaryCloudName,
    api_key: config.cloudinaryKey,
    api_secret: config.cloudinarySeceret,
  });
  

const uploadImageToCloudinary2 = async (file:Express.Multer.File, title: string, subfolderName: string) => {
  try {
    
    // Folder structure setup for cloudinary
    const baseFolder = "QuickEats";
    let subFolder = subfolderName;
    const slug = title.toLowerCase().split(" ").join("-");

    // Combine the base folder, subfolder, and the product name to form the complete folder path
    const publicId = `${baseFolder}/${subFolder}/${slug}`; // Include the product name in the folder path

    const base64Image = Buffer.from(file.buffer).toString("base64");
    const dataURI = `data:${file.mimetype};base64,${base64Image}`;

    const uploadResponse = await cloudinary.uploader.upload(dataURI, {
      resource_type: "auto",
      public_id: `image${Math.round(Math.random() * 1E9)}`,
      folder: publicId,
    });

    return uploadResponse.secure_url;
    
  } catch (error) {
    console.error(error);
    throw new Error("Failed to upload image on cloudinary");    
  }
};

export default uploadImageToCloudinary2;