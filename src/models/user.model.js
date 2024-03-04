import mongoose , {Schema} from "mongoose";
import bcrypt from "bcrypt";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import jwt from "json-web-token";

const userSchema = new Schema(
    {
        username:{
            type:String,
            required:true,
            lowercase:true,
            unique:true,
            trim:true,
            index:true
        },
        email:{
            type:String,
            required:true,
            lowercase:true,
            unique:true,
            trim:true,
        },
        fullname:{
            type:String,
            required:true,
            trim:true,
            index:true
        },
        avatar:{
            type:String, //cloudnary Url
            required:true,

        },
        coverInage:{
            type:String,
        },
        watchhistoy:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Video"
            }
        ],
        password:{
            type:String,
            required:[true, "Password is required!!"]
        },
        refereshToken:{
            type:String
        }
    },
    {
        timestamps:true
    }
);

userSchema.plugin(mongooseAggregatePaginate)
userSchema.pre("save", async function (next) {
    if(!isModified("password")) return next()

    this.password = bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods(isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password) 
})

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.userame,
            fullname:this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.userame,
            fullname:this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:ACCESS_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)