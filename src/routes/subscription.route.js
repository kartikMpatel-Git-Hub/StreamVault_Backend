import { Router } from "express"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {toggleSubscribe,getSubscribed,getSubscribers,getMySubscribers,getMySubscribed} from "../controllers/subscription.controller.js"
const router = Router()

router.use(verifyJWT)

router.route("/toggleSubscribe/:channelId").patch(toggleSubscribe)

router.route("/getSubscribers/:channelId").get(getSubscribers)
router.route("/getMySubscribers/").get(getMySubscribers)
router.route("/getSubscribed/:userId").get(getSubscribed)
router.route("/getMySubscribed/").get(getMySubscribed)

export default router