import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiResponse} from "../utils/apiResponse.js"
import {ApiError} from "../utils/apiError.js"
import { Comment } from "../models/comment.model.js"
import mongoose from "mongoose"

const addComment = asyncHandler(async(req,res)=>{
    try {
        const videoId = req.params.videoId
        const {content} = req.body
        if(!videoId || !content)
            return res.status(300).json(new ApiError(300,"Video Id Or Comment Not Found !!"))
        
        const comment = await Comment.create({
            content,
            video : videoId,
            owner : req.user._id
        })
        if(!comment)
            return res.status(400).json(new ApiError(400,"problem White Adding Comment !!"))
            
        return res.status(200).json(new ApiResponse(200,comment,"Comment Added !!"))
    } catch (error) {
        return res.status(401).json(new ApiError(401,"Something Went Wrong While..!!"))
    }
})

const editComment = asyncHandler(async(req,res)=>{
    try {
        const commentId = req.params.commentId
        const {content} = req.body
        if(!commentId || !content)
            return res.status(300).json(new ApiError(300,"Comment Or Content Not Found !!"))
        
        const comment = await Comment.findByIdAndUpdate(commentId,{
            $set:{
                content
            }
        },{
            new : true
        })
        if(!comment)
            return res.status(400).json(new ApiError(400,"problem White Updating Comment !!"))
            
        return res.status(200).json(new ApiResponse(200,comment,"Comment Updated !!"))
    } catch (error) {
        return res.status(401).json(new ApiError(401,"Something Went Wrong While..!!"))
    }
})

const deleteComment = asyncHandler(async(req,res)=>{
    try {
        const commentId = req.params.commentId
        if(!commentId)
            return res.status(300).json(new ApiError(300,"CommentId Not Found !!"))
            
        const comment = await Comment.findByIdAndDelete(commentId)
        if(!comment)
            return res.status(300).json(new ApiError(300,"Comment Not Found  !!"))
            
        return res.status(200).json(new ApiResponse(200,comment,"Comment Removed !! "))
    } catch (error) {
        return res.status(401).json(new ApiError(401,"Something Went Wrong While..!!"))
    }
})

const getVideoComments = asyncHandler(async(req,res)=>{
    try {
        const videoId = req.params.videoId

        if(!videoId)
            return res.status(300).json(new ApiError(300,"Video Not Found !!"))

        const comments = await Comment.aggregate([
            {
                $match : {
                    video : new mongoose.Types.ObjectId(videoId)
                }
            },
            {
                $lookup : {
                    from : "likes",
                    localField : "_id",
                    foreignField : "comment",
                    as : "likes"
                }
            },
            {
                $lookup : {
                    from : "users",
                    localField : "owner",
                    foreignField :"_id",
                    as : "owner",
                    pipeline : [
                        {
                            $project : {
                                _id : 1,
                                userName : 1,
                                avatar : 1
                            }
                        }
                    ]
                }
            },
            {
                $addFields : {
                    likes : {
                        $size : "$likes"
                    },
                    owner : {
                        $first : "$owner"
                    },
                    isLiked : {
                        $cond : { // // For Condition
                            if : {$in :[req?.user?._id,"$likes.owner"]}, // if for condition
                            //in for check is field exist on selected document
                            then : true, // condition true
                            else : false // conditions false
                        }
                    }
                }
            },
            {
                $sort: {
                    likes : -1,
                    createdAt: -1
                }
            }
        ])
        //console.log(comments)
        return res.status(200).json(new ApiResponse(200,comments,"video comments"))
    } catch (error) {
        return res.status(401).json(new ApiError(401,"Something Went Wrong While Comment Fetching !!"))
    }
})

const yourController = asyncHandler(async(req,res)=>{
    try {
        return res.status(200).json(new ApiResponse(200,{},"<Message>"))
    } catch (error) {
        return res.status(401).json(new ApiError(401,"Something Went Wrong While..!!"))
    }
})

export { addComment,editComment,deleteComment,getVideoComments}