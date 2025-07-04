import { v2 as cloudinary } from "cloudinary"
import fs from "fs"

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloud = async (localFile)=>{
    try {
        if(!localFile) return null;
        const response = await cloudinary.uploader.upload(localFile,{
            resource_type : "auto"
        })
        // console.log(`FIle Is Uploaded`)
        fs.unlinkSync(localFile)
        return response
    } catch (error) {
        console.log(`Something Error : ${error}`)
        fs.unlinkSync(localFile)
        return null
    }
    finally{
    }
}

const removeCloudImage = async (cloudinaryFileName)=>{
    try {
        if(!cloudinaryFileName)
            return null
        const response = await cloudinary.uploader.destroy(cloudinaryFileName,(error,response)=>{
            // console.log(error)
            return response
        })
        console.log("Deleted from Cloudinary..")
        return response
    } catch (error) {
        console.log("Something Went Wrong While Deleting from Cloudinary..")
    }
}
const removeCloudVideo = async (cloudinaryFileName)=>{
    try {
        if (!cloudinaryFileName) 
            return null;

        const publicId = cloudinaryFileName.replace(/\.[^/.]+$/, "")
        const response = await cloudinary.uploader.destroy(publicId, {
            resource_type: 'video',
        })

        console.log("Deleted from Cloudinary:", response)
        return response
    } catch (error) {
        console.log("Something went wrong while deleting from Cloudinary:", error);
        return null;
    }
}

export {uploadOnCloud,removeCloudImage,removeCloudVideo}