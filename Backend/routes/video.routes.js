import express from "express";
import { getallvideos, uploadVideo } from "../controllers/video.controller.js";
import upload from "../helpers/fileupload.helper.js";

const videoRouter = express.Router()

videoRouter.post("/upload", upload.single("file"), uploadVideo)
videoRouter.get("/getall", getallvideos)

export default videoRouter