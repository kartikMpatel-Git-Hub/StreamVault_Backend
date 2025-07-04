import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiResponse} from "../utils/apiResponse.js"
import {ApiError} from "../utils/apiError.js"
import {Tweet} from "../models/tweet.model.js"
import mongoose from "mongoose"

const addTweet = asyncHandler(async(req,res)=>{
    try {
        const {content} = req.body
        if(!content)
            return res.status(300).json(new ApiError(300,"Tweet Content Not Found!!"))
        const tweet = await Tweet.create(
            {
                content,
                owner : req.user?._id
            }
        )
        if(!tweet)
            return res.status(400).json(new ApiError(400,"Something Went Wrong While Adding Tweet!!"))
        return res.status(200).json(new ApiResponse(200,tweet,"Tweet Added"))
    } catch (error) {
        return res.status(401).json(new ApiError(401,"Something Went Wrong While..!!"))
    }
}) //

const editTweet = asyncHandler(async(req,res)=>{
    try {
        let tweetId = req.params.tweetId
        let {content} = req.body
        if(!tweetId)
            return res.status(401).json(new ApiError(401,"Tweet id Not Found!!"))
        const tweet = await Tweet.findByIdAndUpdate(tweetId,{
            $set : {
                content
            }
        },{
            new:true
        })
        // //console.log(tweet)
        if(!tweet)
            return res.status(404).json(new ApiError(401,"Tweet Not Found !!")) 
        return res.status(200).json(new ApiResponse(200,tweet,"Tweet Updated !!"))
    } catch (error) {
        return res.status(401).json(new ApiError(401,"Something Went Wrong While..!!"))
    }
}) //

const deleteTweet = asyncHandler(async(req,res)=>{
    try {
        let tweetId = req.params.tweetId
        if(!tweetId)
            return res.status(401).json(new ApiError(401,"Tweet id Not Found!!"))
        const tweet = await Tweet.findByIdAndDelete(tweetId)
        // //console.log(tweet)
        if(!tweet)
            return res.status(404).json(new ApiError(401,"Tweet Not Found !!"))
        return res.status(200).json(new ApiResponse(200,tweet,"Tweet Deleted !"))
    } catch (error) {
        return res.status(401).json(new ApiError(401,"Something Went Wrong While..!!"))
    }
}) //

const getTweetById = async (tweetId) => {
    let tweet = await Tweet.aggregate([
        {
            $match :{
                _id : new mongoose.Types.ObjectId(tweetId)
            }
        },
        {
            $lookup : {
                from : "likes",
                localField:"_id",
                foreignField:"tweet",
                as : "likes",
            }
        },
        {
            $lookup : {
                from : "users",
                localField : "owner",
                foreignField : "_id",
                as : "owner",
                pipeline : [
                    {
                        $project : {
                            fullName : 1,
                            userName : 1,
                            avatar : 1,
                            coverImage : 1,
                            email : 1
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
                }
                
            }
        },
        {
            $project : {
                _id : 1,
                content : 1,
                likes : 1,
                owner : 1
            }
        }
    ])
    // //console.log(tweet)
    return tweet[0]
}

const getTweet = asyncHandler(async(req,res)=>{
    try {
        const tweetId = req.params.tweetId
        if(!tweetId)
            return res.status(401).json(new ApiError(401,"Tweet id Not Found!!"))
        const tweet = await getTweetById(tweetId)
        //console.log(tweet)
        return res.status(200).json(new ApiResponse(200,tweet,"Your Tweet"))
    } catch (error) {
        return res.status(401).json(new ApiError(401,"Something Went Wrong While..!!"))
    }
})

const getTweets = asyncHandler(async(req,res)=>{
    try {
        let tweet = await Tweet.find()
        const tweets = []
        for(let i = 0; i < tweet.length; i++)
            tweets.push(await getTweetById(tweet[i]._id))
        return res.status(200).json(new ApiResponse(200,tweets,"All Tweets"))
    } catch (error) {
        return res.status(401).json(new ApiError(401,"Something Went Wrong While..!!"))
    }
})

const getMyTweets = asyncHandler(async(req,res)=>{
    try {
        let userId = req.user?._id
        let myTweet = await Tweet.find({
            owner : userId
        }) 
        const tweets = []
        for(let i = 0; i < myTweet.length; i++)
            tweets.push(await getTweetById(myTweet[i]._id))
        return res.status(200).json(new ApiResponse(200,tweets,"My Tweets"))
    } catch (error) {
        return res.status(401).json(new ApiError(401,"Something Went Wrong While..!!"))
    }
})

const getUserTweets = asyncHandler(async(req,res)=>{
    try {
        let userId = req.params.userId
        let userTweet = await Tweet.find({
            owner : userId
        }) 
        const tweets = []
        for(let i = 0; i < userTweet.length; i++)
            tweets.push(await getTweetById(userTweet[i]._id))
        return res.status(200).json(new ApiResponse(200,tweets,"User's All Tweets"))
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

export { addTweet,editTweet,deleteTweet,getTweet,getTweets ,getMyTweets,getUserTweets}