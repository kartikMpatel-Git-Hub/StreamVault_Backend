import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiResponse} from "../utils/apiResponse.js"
import {ApiError} from "../utils/apiError.js"
import {Like} from "../models/like.model.js"
import mongoose from "mongoose"


const toggledLikeOnComment = asyncHandler(async(req,res)=>{
    try {
        let commentId = req.params.commentId
        if(!commentId)
            return res.status(300).json(new ApiError(300,"Comment Id Not Found !!"))
        let commentLiked = await Like.findOneAndDelete({
            comment : commentId,
            owner : req.user?._id   
        })
        if(!commentLiked){
            let like = await Like.create({
                comment : commentId,
                owner : req.user?._id 
            })
            //console.log(like)
            return res.status(200).json(new ApiResponse(200,like,"Like Added !!"))
        }
        return res.status(200).json(new ApiResponse(200,commentLiked,"Like Removed !!"))
    } catch (error) {
        return res.status(401).json(new ApiError(401,"Something Went Wrong While..!!"))
    }
})

const toggledLikeOnVideo = asyncHandler(async(req,res)=>{
    try {
        let videoId = req.params.videoId
        if(!videoId)
            return res.status(300).json(new ApiError(300,"Video Id Not Found !!"))
        let videoLiked =await Like.findOneAndDelete({
            video : videoId,
            owner : req.user?._id   
        })
        if(!videoLiked){
            let like = await Like.create({
                video : videoId,
                owner : req.user?._id 
            })
            return res.status(200).json(new ApiResponse(200,like,"Like Added !!"))
        }
        return res.status(200).json(new ApiResponse(200,videoLiked,"Like Removed !!"))
    } catch (error) {
        return res.status(401).json(new ApiError(401,"Something Went Wrong While..!!"))
    }
})

const toggledLikeOnTweet = asyncHandler(async(req,res)=>{
    try {
        let tweetId = req.params.tweetId
        //console.log(tweetId)
        if(!tweetId)
            return res.status(300).json(new ApiError(300,"Tweet Id Not Found !!"))
        let tweetLiked = await Like.findOneAndDelete({
            tweet : tweetId,
            owner : req.user?._id   
        })
        //console.log(!tweetLiked)
        if(!tweetLiked){
            let like = await Like.create({
                tweet : tweetId,
                owner : req.user?._id 
            })
            return res.status(200).json(new ApiResponse(200,like,"Like Added !!"))
        }
        return res.status(200).json(new ApiResponse(200,tweetLiked,"Like Removed !!"))
    } catch (error) {
        return res.status(401).json(new ApiError(401,"Something Went Wrong While..!!"))
    }
})

const yourController = asyncHandler(async(req,res)=>{
    try {
        return res.status(200).json(new ApiResponse(200,{},"<Message>"))
    } catch (error) {
        return res.status(401).json(new ApiError(401,"Something Went Wrong While..!!"))
    }
})


export { toggledLikeOnComment,toggledLikeOnVideo,toggledLikeOnTweet}