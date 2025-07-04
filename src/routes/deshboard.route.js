import { Router } from "express"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {getChannelState,getChannelVideo} from "../controllers/deshboard.controller.js"

const router = Router()

router.use(verifyJWT)
router.route("/stats").get(getChannelState)
router.route("/videos").get(getChannelVideo)

export default router