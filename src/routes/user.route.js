import { Router } from "express"
import {
  loginUser,
  logOutUser,
  registerUser,
  refreshAccessToken,
  changeUserPassword,
  changeUserUserName,
  changeUserEmail,
  changeUserAvatar,
  changeUserCoverImage,
  changeUserFullName,
  getUserChannelProfile,
  getWatchHistory,
  getCurrentUser,
  getSearchChannel,
  addToHistory,
  getLikedVideos
} from "../controllers/user.controller.js"
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
)
router.route("/login").post(loginUser)

router.route("/changePassword").patch(verifyJWT, changeUserPassword)
router.route("/changeFullName").patch(verifyJWT, changeUserFullName)
router.route("/changeUserName").patch(verifyJWT, changeUserUserName)
router.route("/changeEmail").patch(verifyJWT, changeUserEmail)
router
  .route("/changeAvatar")
  .patch(verifyJWT, upload.single("avatar"), changeUserAvatar)
router
  .route("/changeCoverImage")
  .patch(verifyJWT, upload.single("coverImage"), changeUserCoverImage)

router.route("/logout").get(verifyJWT, logOutUser)
router.route("/newRefreshToken").get(refreshAccessToken)
router.route("/getCurrentUser").get(verifyJWT, getCurrentUser)
router
  .route("/getChannelProfile/:userName")
  .get(verifyJWT, getUserChannelProfile)
router
  .route("/getChannelProfileUnknownUser/:userName")
  .get(getUserChannelProfile)

router.route("/getWatchHistory").get(verifyJWT, getWatchHistory)
router.route("/searchChannel/:query").get(getSearchChannel)
router.route("/getSubscribedChannel/:query").get(verifyJWT, getSearchChannel)
router.route("/addToWatchHistory/:videoId").post(verifyJWT, addToHistory)
router.route("/getLikedVideos").get(verifyJWT,getLikedVideos)
// getSubscribedChannel
export default router
