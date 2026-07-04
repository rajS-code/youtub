import express from "express"
import { deleteComment, editComment, getAllComments, postComment } from "../controllers/comment.controller.js"

const commentRouter = express.Router()

commentRouter.get("/:videoId" , getAllComments)
commentRouter.post("/postComment" , postComment)
commentRouter.delete("/deleteComment/:id", deleteComment)
commentRouter.post("/editComment/:id", editComment)

export default commentRouter;