import { v2 as cloudinary } from "cloudinary";
import config from "../../config/config.js";

  // Configuration
  cloudinary.config({
    cloud_name: config.cloudinaryCloudName,
    api_key: config.cloudinaryKey,
    api_secret: config.cloudinarySeceret,
  });
  
  const uploadImageToCloudinary = async (
    file:Express.Multer.File, 
    title: string, 
    subfolderName: string, 
    existingFolderPath?: string,
    existingPublic_id?: string 
  ) => {
    try {
      
      // Folder structure setup for cloudinary
      const baseFolder = "QuickEats";
      let subFolder = subfolderName;
      const slug = title.toLowerCase().split(" ").join("-");
  
      // Determine public ID for upload
      // If updating, use the existing public ID; otherwise, create a new one based on title and subfolder
      const folderPath = existingFolderPath ?? `${baseFolder}/${subfolderName}/${slug}`;
      const completePatthToDeleteImage = `${existingFolderPath!}/${existingPublic_id}`;

      // If an existing public ID is provided, destroy the old image
      if (existingPublic_id) {
        const destroyResponse = await cloudinary.uploader.destroy(completePatthToDeleteImage);
        if(destroyResponse.result === 'not found') throw new Error('Failed to destroy old image');
      }
  
      const base64Image = Buffer.from(file.buffer).toString("base64");
      const dataURI = `data:${file.mimetype};base64,${base64Image}`;
          
      // upload the image
      const uploadResponse = await cloudinary.uploader.upload(dataURI, {
        resource_type: "auto",
        public_id: `image${Math.round(Math.random() * 1E9)}`,
        folder: folderPath,
      });
  
      return uploadResponse.secure_url;
      
    } catch (error) {
      console.error(error);
      throw new Error("Failed to upload image on cloudinary");    
    }
  };
  
  export default uploadImageToCloudinary;
   


// const uploadImageToCloudinary = async (
//   file:Express.Multer.File, 
//   title: string, 
//   subfolderName: string, 
//   existingFolderPath?: string,
//   existingPublic_id?: string 
// ) => {
//   try {
    
//     // Folder structure setup for cloudinary
//     const baseFolder = "QuickEats";
//     let subFolder = subfolderName;
//     const slug = title.toLowerCase().split(" ").join("-");

//     // Determine public ID for upload
//     // If updating, use the existing public ID; otherwise, create a new one based on title and subfolder
//     const folderPath = existingFolderPath ?? `${baseFolder}/${subfolderName}/${slug}`;
//     const completePatthToOverwrite = `${existingFolderPath!}/${existingPublic_id}`;

//     const base64Image = Buffer.from(file.buffer).toString("base64");
//     const dataURI = `data:${file.mimetype};base64,${base64Image}`;
//     console.log('completePatthToOverwrite', completePatthToOverwrite);
    

//     const uploadResponse = await cloudinary.uploader.upload(dataURI, {
//       resource_type: "auto",
//       public_id: existingPublic_id ?? `image${Math.round(Math.random() * 1E9)}`,
//       folder: folderPath,
//       overwrite: !!completePatthToOverwrite, // Overwrite if updating
//     });

//     return uploadResponse.secure_url;
    
//   } catch (error) {
//     console.error(error);
//     throw new Error("Failed to upload image on cloudinary");    
//   }
// };

// export default uploadImageToCloudinary;


