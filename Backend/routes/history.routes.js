import express from "express"
import { getAllHistoryVideos, handleHistory, handleViews } from "../controllers/history.controller.js"

const historyRouter = express.Router()

historyRouter.get("/:userId", getAllHistoryVideos)
historyRouter.post("/views/:videoId", handleViews)
historyRouter.post("/:videoId", handleHistory)

export default historyRouter;