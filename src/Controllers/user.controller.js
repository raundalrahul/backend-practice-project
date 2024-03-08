import { apiError } from "../utils/apiError.js";
import { reqHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { uplodCloudinary } from "../utils/cloudinary.js";
import { apiRes } from "../utils/apiRes.js";

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

    if([fullname, email, password, username].some((field)=> field?.trim()==="") )
    throw new apiError(400, "All fields are required!!")

    const existedUser = User.findOne({
        $or: [ { username }, { email } ]
    })

    if(existedUser){
        throw new apiError( 409, "User alredy exist")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;

    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new apiError(400, "Avatar file is required!!")
    }

    const avatar = await uplodCloudinary(avatarLocalPath);
    const coverImage = await uplodCloudinary(coverImageLocalPath);

    if(!avatar){
        throw new apiError(400, "avatar file is required!!")
    }

    const user = await User.create({
        fullname,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()
    })

    const userCreated = await User.findById(user._id).select(
        "-password -refereshToken"
    )
    if(!userCreated){
        throw new apiError("500", "Something went wrong!!")
    }

    return res.status(201).json(
        apiRes(201, userCreated, "User registered successfully")
    )

} )

export { registerUser};