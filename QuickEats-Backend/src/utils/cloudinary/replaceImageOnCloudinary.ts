import { TMenuDocument } from "../../types/menu.type.js";
import ErrorHandler from "../errorClass.js";
import getFullPublicIdFromUrl from "../getFullPublicIdFromUrl.js";
import uploadImageToCloudinary from "./uploadImageToCloudinary.js";

export const replaceImageOnCloudinary= async (
  extractedPublicId: any, 
  name: string, 
  file: Express.Multer.File,
  subFolder: string
) => {
  try {    
    const existingPublicId = getFullPublicIdFromUrl(extractedPublicId?.imageUrl)
    
    if(!existingPublicId) throw new ErrorHandler(500, "Failed to extract public id from url");
    
    const imageUrl = await uploadImageToCloudinary(
      file, 
      name, 
      subFolder, 
      existingPublicId.folderPath!, 
      existingPublicId.publicId
    );
    
    if(!imageUrl) throw new ErrorHandler(500, "Failed to upload image");     
    return imageUrl;
    
  } catch (error) {
    console.error("updateImage error = ", error);
    throw error;
  }
}