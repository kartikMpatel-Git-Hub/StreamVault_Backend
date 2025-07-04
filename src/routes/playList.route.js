import { Router } from "express"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {createPlayList,addVideo,changeDescription,changeTitle,removeVideo,getMyAllPlayList,getPlayList,deletePlayList,toggleVisibility,getChannelPlaylists} from "../controllers/playList.controller.js"
const router = Router()

router.use(verifyJWT)

router.route("/createPlayList").post(createPlayList)
router.route("/addVideo/:videoId/:playListId").post(addVideo)

router.route("/changeTitle/:playListId").patch(changeTitle)
router.route("/changeDescription/:playListId").patch(changeDescription)
router.route("/toggleVisibility/:playListId").patch(toggleVisibility)

router.route("/removeVideo/:videoId/:playListId").delete(removeVideo)
router.route("/removePlaylist/:playListId").delete(deletePlayList)

router.route("/getMyPlayList").get(getMyAllPlayList)
router.route("/getChannelPlaylists/:userName").get(getChannelPlaylists)
router.route("/getPlayList/:playListId").get(getPlayList)

export default router