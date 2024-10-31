import ErrorHandler from "../errorClass.js";
import getFullPublicIdFromUrl from "../getFullPublicIdFromUrl.js";
import deleteImageAndSubfolderFromCloudinary from "./deletImageFromCloudinary.js";

export const deleteImageFromCloudinary = async (extractedPublicId: any) => {
  try {
    const existingPublicId = getFullPublicIdFromUrl(extractedPublicId?.image)
    if(!existingPublicId) throw new ErrorHandler(500, "Failed to extract public id from url");
    
    const result = await deleteImageAndSubfolderFromCloudinary(existingPublicId.folderPath!);   
    if(!result) throw new ErrorHandler(500, "Failed to delet Folder and its images"); 
   
    return result;
    
  } catch (error) {
    console.error("deleteImageFromCloudinary error = ", error);
    throw error;
  }
}