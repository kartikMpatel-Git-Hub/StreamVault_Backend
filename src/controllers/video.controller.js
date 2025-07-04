import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { ApiError } from "../utils/apiError.js"
import {
  uploadOnCloud,
  removeCloudImage,
  removeCloudVideo,
} from "../utils/cloudinary.js"
import { Video } from "../models/video.model.js"
import { Like } from "../models/like.model.js"
import { Subscription } from "../models/subscription.model.js"
import mongoose from "mongoose"
import { User } from "../models/user.model.js"

const uploadVideo = asyncHandler(async (req, res) => {
  try {
    /**
     *
     * 1.get(title,description)
     * 2.get(video,thumbnail)
     * 3.upload it
     * 4.get video data (like - fileurl,duration) and thumbnail(url) data
     */

    let { title, description,visibility} = req.body
    if (!title || !description)
      return res.status(401).json(new ApiError(401, "All Field Is Required !!"))
    let videoLocalPath
    if (
      req.files &&
      Array.isArray(req.files.videoFile) &&
      req.files.videoFile.length > 0
    )
      videoLocalPath = req.files.videoFile[0].path
    else
      return res.status(400).json(new ApiError(400, "videoFile Is Required !!"))

    // //console.log(videoLocalPath)
    let thumbnailLocalPath
    if (
      req.files &&
      Array.isArray(req.files.thumbnail) &&
      req.files.thumbnail.length > 0
    )
      thumbnailLocalPath = req.files.thumbnail[0].path
    else
      return res.status(400).json(new ApiError(400, "thumbnail Is Required !!"))
    // //console.log(thumbnailLocalPath)

    const video = await uploadOnCloud(videoLocalPath)
    const thumbnail = await uploadOnCloud(thumbnailLocalPath)

    //console.log(video)
    //console.log(thumbnail)

    if (!video || !thumbnail)
      return res
        .status(500)
        .json(new ApiError(500, "something Went Wrong While Uploading !!"))

    const videoUploaded = await Video.create({
      title,
      description,
      videoFile: video.secure_url,
      thumbnail: thumbnail.secure_url,
      duration: video.duration,
      isPublished : visibility === "public",
      owner: req.user?._id,
    })
    if (!videoUploaded)
      return res
        .status(500)
        .json(
          new ApiError(500, "something Went Wrong While Saving On Database!!")
        )

    return res
      .status(200)
      .json(new ApiResponse(200, videoUploaded, "Video Uploaded Succesfully.."))
  } catch (error) {
    return res
      .status(401)
      .json(
        new ApiError(401, "Something Went Wrong While Uploading new Video !!")
      )
  }
}) //

const removeVideo = asyncHandler(async (req, res) => {
  try {
    let videoId = req.params.videoId
    if (!videoId)
      return res.status(401).json(new ApiError(401, "Video id Not Found!!"))
    const video = await Video.findById(videoId)
    // //console.log(video)
    if (!video)
      return res.status(404).json(new ApiError(401, "Video Not Found !!"))
    const thumbnailurl = video.thumbnail
    const videourl = video.videoFile
    let cloudThumbnail = thumbnailurl.split("/")
    let cloudVideo = videourl.split("/")
    cloudThumbnail = cloudThumbnail[cloudThumbnail.length - 1].split(".")[0]
    cloudVideo = cloudVideo[cloudVideo.length - 1].split(".")[0]
    const response1 = await removeCloudImage(cloudThumbnail)
    if (!response1)
      return res
        .status(504)
        .json(
          new ApiError(501, "Something Went Wrong While Deleting From Cloud !!")
        )
    // //console.log(cloudVideo)
    const response2 = await removeCloudVideo(cloudVideo)
    if (!response2)
      return res
        .status(504)
        .json(
          new ApiError(501, "Something Went Wrong While Deleting From Cloud !!")
        )
    await Video.findByIdAndDelete(videoId)
    return res.status(200).json(new ApiResponse(200, {}, "Video Deleted !!"))
  } catch (error) {
    return res
      .status(401)
      .json(new ApiError(401, "Something Went Wrong While..!!"))
  }
})

const changeTitle = asyncHandler(async (req, res) => {
  try {
    let { title } = req.body
    let videoId = req.params.videoId
    if (!videoId)
      return res.status(401).json(new ApiError(401, "Video id Not Found!!"))
    const video = await Video.findByIdAndUpdate(
      videoId,
      {
        $set: {
          title,
        },
      },
      { new: true }
    )
    if (!video)
      return res.status(404).json(new ApiError(401, "Video Not Found !!"))
    return res.status(200).json(new ApiResponse(200, video, "Title Updated !!"))
  } catch (error) {
    return res
      .status(401)
      .json(new ApiError(401, "Something Went Wrong While..!!"))
  }
}) //

const changeThumbnail = asyncHandler(async (req, res) => {
  try {
    const localThumbnailPath = req.file?.path
    let videoId = req.params.videoId
    if (!videoId)
      return res.status(401).json(new ApiError(401, "Video id Not Found!!"))

    if (!localThumbnailPath)
      return res.status(401).json(new ApiError(401, "Thumbnail Not Found !!"))

    const thumbnail = await uploadOnCloud(localThumbnailPath)
    // //console.log(thumbnail)
    if (!thumbnail)
      return res
        .status(401)
        .json(new ApiError(401, "Problem While Uploading On cloud !!"))

    const video = await Video.findById(videoId)
    if (!video)
      return res.status(404).json(new ApiError(401, "Video Not Found !!"))
    const oldImage = video.thumbnail
    video.thumbnail = thumbnail.secure_url
    await video.save()
    let cloudFileName = oldImage.split("/")
    cloudFileName = cloudFileName[cloudFileName.length - 1].split(".")[0]
    const response = await removeCloudImage(cloudFileName)
    if (!response) {
      res
        .status(401)
        .json(
          new ApiError(401, "Something Wrong While Deleting", error.message)
        )
    }
    return res
      .status(200)
      .json(new ApiResponse(200, video, "new Thumbnail Uploaded !!"))
  } catch (error) {
    return res
      .status(401)
      .json(new ApiError(401, "Something Went Wrong While..!!"))
  }
}) //

const changeDescription = asyncHandler(async (req, res) => {
  try {
    let { description } = req.body
    let videoId = req.params.videoId
    if (!videoId)
      return res.status(401).json(new ApiError(401, "Video id Not Found!!"))
    const video = await Video.findByIdAndUpdate(
      videoId,
      {
        $set: {
          description,
        },
      },
      { new: true }
    )
    if (!video)
      return res.status(404).json(new ApiError(401, "Video Not Found !!"))
    return res
      .status(200)
      .json(new ApiResponse(200, video, "description Updated !!"))
  } catch (error) {
    return res
      .status(401)
      .json(new ApiError(401, "Something Went Wrong While..!!"))
  }
}) //

const togglePublishStatus = asyncHandler(async (req, res) => {
  try {
    let videoId = req.params.videoId
    if (!videoId)
      return res.status(401).json(new ApiError(401, "Video id Not Found!!"))
    const video = await Video.findOne({
      _id: videoId,
      owner: req.user._id,
    })
    if (!video) return res.status(401).json(new ApiError(401, "Not Authorized"))
    video.isPublished = !video.isPublished
    video.save()
    // if(video[0].isPublished){
    //     video[0].isPublished = false
    // }else{
    //     video[0].isPublished = true
    // }
    return res.status(200).json(new ApiResponse(200, video, "Status Updated !"))
  } catch (error) {
    return res
      .status(401)
      .json(new ApiError(401, "Something Went Wrong While..!!"))
  }
}) //

const getVideoById = async (videoId) => {
  const video = await Video.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(videoId),
      },
    },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "video",
        as: "likes",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
        pipeline: [
          {
            $project: {
              userName: 1,
              avatar: 1,
              _id: 0,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        likes: {
          $size: "$likes",
        },
        owner: {
          $first: "$owner",
        },
      },
    },
  ])
  return video[0]
}

const getMyVideos = asyncHandler(async (req, res) => {
  try {
    const myVideos = await Video.find({
      owner: req.user?._id,
    })
    const videos = []
    for (let i = 0; i < myVideos.length; i++) {
      videos.push(await getVideoById(myVideos[i]._id))
    }
    return res
      .status(200)
      .json(new ApiResponse(200, videos, "Your Videos Fetched"))
  } catch (error) {
    return res
      .status(401)
      .json(
        new ApiError(401, "Something Went Wrong Here While..!!" + error.message)
      )
  }
}) //

const getAllVideos = asyncHandler(async (req, res) => {
  try {
    const allVideo = await Video.find({
      isPublished: true,
    }).sort({views : -1,createdAt: -1})
    const videos = []
    for (let i = 0; i < allVideo.length; i++)
      videos.push(await getVideoById(allVideo[i]._id))
    return res.status(200).json(new ApiResponse(200, videos, "All Video"))
  } catch (error) {
    return res
      .status(401)
      .json(new ApiError(401, "Something Went Wrong While all videos!!"))
  }
})

const getVideo = asyncHandler(async (req, res) => {
  try {
    let videoId = req.params.videoId
    if (!videoId)
      return res.status(401).json(new ApiError(401, "Video id Not Found!!"))
    const video = await getVideoById(videoId)

    if (!video)
      return res.status(404).json(new ApiError(401, "Video Not Found !!"))
    if (!video.isPublished)
      return res.status(400).json(new ApiError(401, "Video is Private !!"))
    return res.status(200).json(new ApiResponse(200, video, "Video Fetched !!"))
  } catch (error) {
    return res
      .status(401)
      .json(new ApiError(401, "Something Went Wrong While getting video!!"))
  }
}) //

const addToHistory = asyncHandler(async (req, res) => {
  try {
    let videoId = req.params.videoId
    // console.log("here")
    // console.log(req.user)
    if (req.user) {
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { watchHistory: videoId },
      })
      const user = await User.findByIdAndUpdate(
        req.user._id,
        {
          $push: {
            watchHistory: {
              $each: [videoId],
              $position: 0,
            },
          },
        },
        { new: true }
      )
    }
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Video Added !!"))
  } catch (error) {
    return res
      .status(401)
      .json(new ApiError(401, "Something Went Wrong While..!!"))
  }
})

const viewVideo = asyncHandler(async (req, res) => {
  try {
    let videoId = req.params.videoId
    if (!videoId)
      return res.status(401).json(new ApiError(401, "Video id Not Found!!"))
    const video = await Video.findById(videoId)
    if (!video)
      return res.status(404).json(new ApiError(401, "Video Not Found !!"))
    if (
      req.user &&
      video.owner.toString() === req.user._id.toString() &&
      !video.isPublished
    ) {
      return res
        .status(200)
        .json(new ApiResponse(200, video, "Your Video Fetched !!"))
    }
    if (!video.isPublished)
      return res.status(400).json(new ApiError(401, "Video is Private !!"))
    video.views += 1
    video.save()
    //console.log(req.user)

    const videoView = await getVideoById(videoId)
    if (!videoView)
      return res
        .status(400)
        .json(new ApiError(401, "Problem White Getting Video !!"))

    return res
      .status(200)
      .json(new ApiResponse(200, videoView, "Video Fetched !!"))
  } catch (error) {
    return res
      .status(401)
      .json(new ApiError(401, "Something Went Wrong While..!!"))
  }
}) //

const engagementVideo = asyncHandler(async (req, res) => {
  try {
    let videoId = req.params.videoId
    if (!videoId)
      return res.status(401).json(new ApiError(401, "Video id Not Found!!"))
    const video = await Video.findById(videoId)
    if (!video)
      return res.status(404).json(new ApiError(401, "Video Not Found !!"))
    // //console.log(videoId)
    const isLiked = await Like.findOne({
      owner: new mongoose.Types.ObjectId(req.user?._id),
      video: new mongoose.Types.ObjectId(videoId),
    })
    const isSubscribed = await Subscription.findOne({
      subscriber: new mongoose.Types.ObjectId(req.user._id),
      channel: new mongoose.Types.ObjectId(video.owner),
    })
    let response = {}
    if (!isLiked) response.isLiked = false
    else response.isLiked = true
    if (!isSubscribed) response.isSubscribed = false
    else response.isSubscribed = true

    return res.status(200).json(new ApiResponse(200, response, "User Data"))
  } catch (error) {
    return res
      .status(401)
      .json(new ApiError(401, "Something Went Wrong While..!!"))
  }
})

const getChannelVideos = asyncHandler(async (req, res) => {
  try {
    const userName = req.params.userName
    if (!userName)
      return res.status(200).json(new ApiError(300, "User Not Found"))

    const user = await User.findOne({
      userName,
    })
    const myVideos = await Video.find({
      owner: user._id,
      isPublished: true,
    })
    const videos = []
    for (let i = 0; i < myVideos.length; i++) {
      videos.push(await getVideoById(myVideos[i]._id))
    }

    return res.status(200).json(new ApiResponse(200, videos, "Videos Fetched"))
  } catch (error) {
    return res
      .status(401)
      .json(
        new ApiError(401, "Something Went Wrong Here While..!!" + error.message)
      )
  }
})

const getSerachResult = asyncHandler(async (req, res) => {
  try {
    const query = req.params.query
    let regex = query.split(" ").join("|")
    const videos = await Video.aggregate([
      
      {
        $lookup : {
          from : "users",
          localField : "owner",
          foreignField : "_id",
          as : "owner",
          pipeline : [
            {
              $project : {
                _id : 0,
                userName : 1
              }
            }
          ]
        }
      },
      {
        $addFields : {
          owner : {
            $first: "$owner",
          },
        }
      },
      {
        $match: {
          $or : [
            {
              title: {$regex: regex,$options: "i"}
            },
            { "owner.userName": { $regex: regex, $options: "i" } }
          ]
        },
      },
      
    ])
    console.log("video")
    console.log(videos)
    const searchVideos = []
    for (let video of videos) searchVideos.push(await getVideoById(video._id))
    return res.status(200).json(new ApiResponse(200, searchVideos, "<Message>"))
  } catch (error) {
    console.log(error)
    return res
      .status(401)
      .json(new ApiError(401, "Something Went Wrong While..!!"))
  }
})

const yourController = asyncHandler(async (req, res) => {
  try {
    return res.status(200).json(new ApiResponse(200, {}, "<Message>"))
  } catch (error) {
    return res
      .status(401)
      .json(new ApiError(401, "Something Went Wrong While..!!"))
  }
})

export {
  uploadVideo,
  removeVideo,
  changeTitle,
  changeThumbnail,
  changeDescription,
  togglePublishStatus,
  getAllVideos,
  getMyVideos,
  getVideo,
  viewVideo,
  engagementVideo,
  getChannelVideos,
  getSerachResult,
  addToHistory
}
