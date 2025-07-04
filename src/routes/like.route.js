import { Router } from "express"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import { toggledLikeOnComment,toggledLikeOnVideo,toggledLikeOnTweet} from "../controllers/like.controller.js"
const router = Router()

router.use(verifyJWT)

router.route("/video/:videoId").post(toggledLikeOnVideo)
router.route("/tweet/:tweetId").post(toggledLikeOnTweet)
router.route("/comment/:commentId").post(toggledLikeOnComment)


export default router