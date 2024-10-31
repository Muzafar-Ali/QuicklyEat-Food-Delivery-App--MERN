
// const getFullPublicIdFromUrl = (url: string | undefined) => {
//   const regex = /\/upload\/[^\/]+\/(.+)$/;
//   const match = url?.match(regex);
//   return match ? match[1].split('.')[0] : null; // Get the full public ID without the file extension
// };

// export default getFullPublicIdFromUrl;

// const getFullPublicIdFromUrl = (url: string | undefined) => {
//   const regex = /\/upload\/[^\/]+\/(.*\/)([^\/]+)\.[^\/]+$/; // Capture everything up to the last segment
//   const match = url?.match(regex);
//   return match ? `${match[1]}${match[2]}` : null; // Combine path with the public ID
// };

// export default getFullPublicIdFromUrl;

// const getFolderPathFromUrl = (url: string | undefined) => {
//   const regex = /\/upload\/[^\/]+\/(.*\/)[^\/]+\.[^\/]+$/; // Capture everything up to the last filename
//   const match = url?.match(regex);
//   return match ? match[1].slice(0, -1) : null; // Remove the trailing slash
// };

// export default getFolderPathFromUrl;

const getPathAndFileFromUrl = (url: string | undefined | null) => {
  
  if (!url) {
    console.error("URL is undefined or null.");
    return null;
  }

  const regex = /\/upload\/[^\/]+\/(.+\/)([^\/]+)\.[^\/]+$/; // Capture folder and filename
  const match = url?.match(regex);
  
  if (match) {
    const folderPath = match[1]; // Folder path including the trailing slash
    const publicId = match[2]; // The public ID (filename without extension)
    
    return {
      folderPath: folderPath.slice(0, -1), // Remove the trailing slash
      publicId: publicId, // The public ID
    };
  } else {
    console.error("URL does not match the expected pattern.");
  }

  return null;
};

export default getPathAndFileFromUrl;