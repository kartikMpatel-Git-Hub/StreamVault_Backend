import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { ApiError } from "../utils/apiError.js"
import { PlayList } from "../models/playlist.model.js"
import { Video } from "../models/video.model.js"
import mongoose from "mongoose"
import { User } from "../models/user.model.js"

const createPlayList = asyncHandler(async (req, res) => {
  try {
    const { title, description, visibility } = req.body
    //console.log(visibility)
    if (!title || !description)
      return res
        .status(300)
        .json(new ApiError(300, "Playlist title Not Found "))
    const playList = await PlayList.create({
      title,
      description,
      visibility: (visibility === "public") | false,
      owner: req.user._id,
    })
    return res
      .status(200)
      .json(new ApiResponse(200, playList, "playlist Created"))
  } catch (error) {
    return res
      .status(401)
      .json(new ApiError(401, "Something Went Wrong While..!!"))
  }
}) //

const addVideo = asyncHandler(async (req, res) => {
  try {
    const videoId = req.params.videoId
    const playListId = req.params.playListId
    if (!videoId || !playListId)
      return res
        .status(300)
        .json(new ApiError(300, "Video Or Playlist Not Found !!"))
    const video = await Video.findById(videoId)
    const playList = await PlayList.findById(playListId)
    // //console.log(video)
    // console.log(playList)
    if (!video)
      return res.status(300).json(new ApiError(300, "Video is Not Available!!"))
    if (!playList)
      return res
        .status(300)
        .json(new ApiError(300, "PlayList is Not Available!!"))
    const response = await PlayList.findByIdAndUpdate(
      playListId,
      { $addToSet: { video: videoId } },
      { new: true }
    )
    //console.log(response)
    return res
      .status(200)
      .json(new ApiResponse(200, response, "Video Added !!"))
  } catch (error) {
    return res
      .status(401)
      .json(new ApiError(401, "Something Went Wrong While..!!"))
  }
}) //

const changeDescription = asyncHandler(async (req, res) => {
  try {
    const { description } = req.body
    if (!description)
      return res.status(401).json(new ApiError(300, "Description Not Found !!"))
    const playListId = req.params.playListId
    if (!playListId)
      return res.status(300).json(new ApiError(300, "Playlist Not Found !!"))
    const playList = await PlayList.findByIdAndUpdate(
      playListId,
      { $set: { description } },
      { new: true }
    )
    if (!playList)
      return res.status(300).json(new ApiError(300, "Playlist Not Exist!!"))
    //console.log(playList)
    return res
      .status(200)
      .json(new ApiResponse(200, playList, "Description Updated Succesfully"))
  } catch (error) {
    return res
      .status(401)
      .json(new ApiError(401, "Something Went Wrong While..!!"))
  }
}) //

const changeTitle = asyncHandler(async (req, res) => {
  try {
    const { title } = req.body
    if (!title)
      return res.status(401).json(new ApiError(300, "title Not Found !!"))
    const playListId = req.params.playListId
    if (!playListId)
      return res.status(300).json(new ApiError(300, "Playlist Not Found !!"))
    const playList = await PlayList.findByIdAndUpdate(
      playListId,
      { $set: { title } },
      { new: true }
    )
    if (!playList)
      return res.status(300).json(new ApiError(300, "Playlist Not Exist!!"))
    //console.log(playList)
    return res
      .status(200)
      .json(new ApiResponse(200, playList, "title Updated Succesfully"))
  } catch (error) {
    return res
      .status(401)
      .json(new ApiError(401, "Something Went Wrong While..!!"))
  }
}) //

const removeVideo = asyncHandler(async (req, res) => {
  try {
    const videoId = req.params.videoId
    const playListId = req.params.playListId
    if (!videoId || !playListId)
      return res
        .status(300)
        .json(new ApiError(300, "Video Or Playlist Not Found !!"))
    const video = await Video.findById(videoId)
    const playList = await PlayList.findById(playListId)
    if (!video)
      return res.status(300).json(new ApiError(300, "Video is Not Available!!"))
    if (!playList)
      return res
        .status(300)
        .json(new ApiError(300, "PlayList is Not Available!!"))
    const list = await PlayList.findById(playListId)
    const isExist = list.video.some(
      (id) => id.toString() === videoId.toString()
    )
    if (!isExist)
      return res
        .status(300)
        .json(new ApiError(300, "Video Is Not in PlayList!!"))

    const response = await PlayList.findByIdAndUpdate(
      playListId,
      { $pull: { video: videoId } },
      { new: true }
    )
    return res
      .status(200)
      .json(new ApiResponse(200, response, "Video Removed !!"))
  } catch (error) {
    return res
      .status(401)
      .json(new ApiError(401, "Something Went Wrong While..!!"))
  }
}) //

const getPlaylistById = async (playlistId) => {
  const playLists = await PlayList.aggregate([
    {
      $match: {
        _id : playlistId,
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "video",
        foreignField: "_id",
        as: "videos",
        pipeline: [
          {
            $match: {
              isPublished: true,
            },
          },
          {
            $project: {
              videoFile: 0,
              createdAt: 0,
              updatedAt: 0,
            },
          },
        ],
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
              _id: 1,
              userName: 1,
              email: 1,
              avatar: 1,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        owner: {
          $first: "$owner",
        },
      },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        description: 1,
        owner: 1,
        visibility: 1,
        videos: 1,
        updatedAt : 1,
        createdAt : 1
      },
    },
  ])
  return playLists[0]
}

const getMyAllPlayList = asyncHandler(async (req, res) => {
  try {
    const myPlaylists = await PlayList.find({
        owner : req.user._id
    })
    let playLists = []
    for(let i = 0; i < myPlaylists.length; i++){
        playLists.push(await getPlaylistById(myPlaylists[i]._id))
    }
    if (!playLists)
      return res.status(300).json(new ApiError(300, "Not Playlist Found !"))
    
    return res
      .status(200)
      .json(new ApiResponse(200, playLists, "Your Playlists"))
  } catch (error) {
    console.log(error)
    return res
      .status(401)
      .json(new ApiError(401, "Something Went Wrong While..!!"))
  }
}) //

const getPlayList = asyncHandler(async (req, res) => {
  try {
    const playListId = req.params.playListId
    if (!playListId)
      return res.status(300).json(new ApiError(300, "Playlist Id Not Found !"))
    const playList = await PlayList.findById(playListId)
    if (!playList)
      return res.status(300).json(new ApiError(300, "Playlist Not Found !"))
    if (
      !playList.visibility &&
      !(playList.owner.toString() === req.user._id.toString())
    )
      return res.status(300).json(new ApiError(300, "Playlist Is Private !"))
    return res.status(200).json(new ApiResponse(200, playList, "PlayList"))
  } catch (error) {
    return res
      .status(401)
      .json(new ApiError(401, "Something Went Wrong While..!!"))
  }
}) //

const deletePlayList = asyncHandler(async (req, res) => {
  try {
    const playListId = req.params.playListId
    if (!playListId)
      return res.status(300).json(new ApiError(300, "Playlist Id Not Found !"))
    const playList = await PlayList.findOneAndDelete({
      _id: playListId,
      owner: req.user._id,
    })
    if (!playList)
      return res.status(404).json(new ApiError(404, "Playlist Not Found !"))

    return res.status(200).json(new ApiResponse(200, playList, "Deleted List"))
  } catch (error) {
    return res
      .status(401)
      .json(new ApiError(401, "Something Went Wrong While..!!"))
  }
}) //

const toggleVisibility = asyncHandler(async (req, res) => {
  try {
    const playListId = req.params.playListId
    if (!playListId)
      return res.status(300).json(new ApiError(300, "Playlist Id Not Found !"))
    const playList = await PlayList.findOne({
      _id: playListId,
      owner: req.user._id,
    })
    if (!playList)
      return res.status(404).json(new ApiError(404, "Playlist Not Found !"))
    playList.visibility = !playList.visibility
    //console.log(playList)
    const response = await playList.save()
    return res
      .status(200)
      .json(new ApiResponse(200, response, "Status Updated"))
  } catch (error) {
    return res
      .status(401)
      .json(new ApiError(401, "Something Went Wrong While..!!" + error.message))
  }
}) //

const getChannelPlaylists = asyncHandler(async (req, res) => {
  try {
    const userName = req.params.userName
    const userPlaylists = await User.aggregate([
      {
        $match : {
          userName
        }
      },
      {
        $lookup : {
          from : "playlists",
          localField : "_id",
          foreignField : "owner",
          as : "playlists"
        }
      }
    ])
    const list = []
    for(let i = 0; i < userPlaylists[0].playlists.length; i++){
      if(userPlaylists[0].playlists[i].visibility)
        list.push(await getPlaylistById(userPlaylists[0].playlists[i]._id))
    }
    return res.status(200).json(new ApiResponse(200, list, "Channel Playlists"))
  } catch (error) {
    return res
      .status(401)
      .json(new ApiError(401, "Something Went Wrong While..!!"))
  }
})

export {
  createPlayList,
  addVideo,
  changeDescription,
  changeTitle,
  removeVideo,
  getMyAllPlayList,
  getPlayList,
  deletePlayList,
  toggleVisibility,
  getChannelPlaylists
}
