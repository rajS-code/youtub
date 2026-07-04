import express from "express"
import { getAllWatchLaterVideos, handleWatchLater } from "../controllers/watchLater.controller.js"

const watchLaterRouter = express.Router()

watchLaterRouter.get("/:userId", getAllWatchLaterVideos)
watchLaterRouter.post("/:videoId", handleWatchLater)

export default watchLaterRouter;