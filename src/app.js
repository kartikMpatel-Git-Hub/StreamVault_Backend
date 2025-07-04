import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()
const allowedOrigins = process.env.CORS_ORIGIN.split(',')
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}))

app.use(express.json({limit:process.env.LIMITS}))
app.use(express.urlencoded({extended:true,limit:process.env.LIMITS}))
app.use(express.static("public"))
app.use(cookieParser())

//Routes 
import commentRouter from './routes/comment.route.js'
import likeRouter from './routes/like.route.js'
import playListRouter from './routes/playList.route.js'
import subscriptionRouter from './routes/subscription.route.js'
import tweetRouter from './routes/tweet.route.js'
import userRouter from './routes/user.route.js'
import videoRouter from './routes/video.route.js'
import deshboardRouter from './routes/deshboard.route.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
})
app.use("/api/v1/comments",commentRouter)
app.use("/api/v1/likes",likeRouter)
app.use("/api/v1/playLists",playListRouter)
app.use("/api/v1/subscriptions",subscriptionRouter)
app.use("/api/v1/tweets",tweetRouter)
app.use("/api/v1/users",userRouter)
app.use("/api/v1/videos",videoRouter)
app.use("/api/v1/deshboard",deshboardRouter)

//http://localhost:4000/api/v1/users/register
export {app}