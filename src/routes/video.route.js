import { Router } from "express"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {upload} from "../middlewares/multer.middleware.js"
import {uploadVideo,removeVideo,changeTitle,changeThumbnail,changeDescription,
    togglePublishStatus ,getAllVideos,getMyVideos,getVideo,viewVideo,engagementVideo,
    getChannelVideos,getSerachResult} from "../controllers/video.controller.js"
const router = Router()

// router.use(verifyJWT)

router.route("/uploadVideo").post(verifyJWT,upload.fields([{name :"videoFile",maxCount : 1},{name :"thumbnail",maxCount : 1}]),uploadVideo)

router.route("/removeVideo/:videoId").delete(verifyJWT,removeVideo)

router.route("/changeThumbnail/:videoId").patch(verifyJWT,upload.single("thumbnail"),changeThumbnail)
router.route("/changeTitle/:videoId").patch(verifyJWT,changeTitle)
router.route("/changeDescription/:videoId").patch(verifyJWT,changeDescription)
router.route("/toggledStatus/:videoId").patch(verifyJWT,togglePublishStatus) 

router.route("/userEngagement/:videoId").get(verifyJWT,engagementVideo)
router.route("/watchVideo/:videoId").get(verifyJWT,viewVideo)
router.route("/watchVideoUnknownUser/:videoId").get(viewVideo)
router.route("/getVideo/:videoId").get(getVideo)
router.route("/getMyVideos").get(verifyJWT,getMyVideos)
router.route("/getChannelVideos/:userName").get(getChannelVideos)
router.route("/getSeachVideos/:query").get(getSerachResult)
router.route("/").get(getAllVideos)

export default router