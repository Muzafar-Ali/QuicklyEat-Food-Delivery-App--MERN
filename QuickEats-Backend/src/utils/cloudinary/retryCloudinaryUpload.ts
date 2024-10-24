import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { shouldRetryUpload } from "./shouldRetryUpload.js";


type UploadOptions = {
  resource_type?: "auto" | "image";
  public_id?: string;
  folder?: string;
}

export const retryCloudinaryUpload = async (imagePath: string, options: UploadOptions ) => {
  const maxRetries = 3; 
  let uploadAttempts = 0; 
  let waitTime = 1000; // Initial wait time in milliseconds
  
  do {
    try {
      const result = await cloudinary.uploader.upload(imagePath, options);

      fs.unlinkSync(imagePath);
      return result; // Upload successful, return result and exit
    
    } catch (error: any) {

      if (shouldRetryUpload(error.http_code) && uploadAttempts < maxRetries) {
        console.warn(`Cloudinary upload timed out. Retrying attempt ${uploadAttempts + 1} of ${maxRetries}`);
        uploadAttempts++;
        await new Promise((resolve) => setTimeout(resolve, waitTime));
        waitTime *= 2;
      } else {
        throw error; // Re-throw non-timeout errors
      }
    }
  } 
  while (uploadAttempts < maxRetries);

  console.error(`Cloudinary upload failed after ${maxRetries} retries.`);
  return null;
}