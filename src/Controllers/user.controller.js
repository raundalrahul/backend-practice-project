import { reqHandler } from "../utils/asyncHandler.js";

const registerUser = reqHandler( async (req, res)=>{
    //get users details from frontend
    //validation check
    //check if user alredy exist : username, email
    //check for images and avatar
    //uplod to cloudinary, avatar
    //create user object
    //remove password and refrestoken field from the response
    //checl for user creation
    //return res

    const { username, email, fullname, password  } = req.body
    console.table({username, email, fullname, password});
} )

export { registerUser};