import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"

export const verifyJWT = asyncHandler(async (req,res,next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","") //Also Use Substring to cut it down
        
        if(!token)
            return res.status(401).json(new ApiError(401,"Token Not Found Please Login!!"))
        
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if(!user)
            return res.status(401).json(new ApiError(401,"Invalid Token !!"))
        req.user = user
        // console.log(`Before : ${req.user}`)
        next()
    } catch (error) {
        return res.status(401).json(new ApiError(401,"Something Went Wrong While Token Verification !!"))
    }
})