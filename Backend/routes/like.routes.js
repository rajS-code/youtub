import express from "express"
import { getAllLikedVideos, handleLike } from "../controllers/like.controller.js"

const likeRouter = express.Router()

likeRouter.get('/:userId', getAllLikedVideos)
likeRouter.post('/:videoId', handleLike)

export default likeRouter;