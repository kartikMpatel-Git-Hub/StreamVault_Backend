import { Router } from "express"
import {addComment,editComment,deleteComment,getVideoComments} from "../controllers/comment.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router()

// router.use(verifyJWT)

router.route("/addComment/:videoId").post(verifyJWT,addComment)

router.route("/getComments/:videoId").get(verifyJWT,getVideoComments)

router.route("/getCommentsUnkownUser/:videoId").get(getVideoComments)

router.route("/removeComment/:commentId").delete(verifyJWT,deleteComment)

router.route("/updateComment/:commentId").patch(verifyJWT,editComment)

export default router