import { Router } from "express"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import { addTweet,editTweet,deleteTweet,getTweet,getTweets,getMyTweets,getUserTweets } from "../controllers/tweet.controller.js"
const router = Router()

router.use(verifyJWT)

router.route("/postTweet").post(addTweet)

router.route("/getMyTweets/").get(getMyTweets)
router.route("/getUserTweets/:userId").get(getUserTweets)
router.route("/getTweet/:tweetId").get(getTweet)
router.route("/getTweets/").get(getTweets)

router.route("/updateTweet/:tweetId").patch(editTweet)

router.route("/deleteTweet/:tweetId").delete(deleteTweet)

export default router