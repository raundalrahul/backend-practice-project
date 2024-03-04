import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY 
});

const uplodCloudinary = async (localFilePath)=>{
  try{
    if(!localFilePath) return null

    //uplod cloudinary file path
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type:"auto"
    })
    //file has been uploded successfully.
    console.log("The file has been uploded successfully", response.url);

    return response
  }catch (error){
      fs.unlinkSync(localFilePath) //this will remove temp file if petation goes failed.

      return null
  }
}

export {uplodCloudinary}