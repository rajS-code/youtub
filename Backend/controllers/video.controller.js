import video from "../models/video.model.js";
import upload from "../helpers/fileupload.helper.js";

export const uploadVideo = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    } else {
        try {
            const file = new video({
                videotitle: req.body.videotitle,
                filename: req.file.originalname,
                filetype: req.file.mimetype,
                filepath: req.file.path,
                filesize: req.file.size,
                videochannel: req.body.videochannel,
                uploader: req.body.uploader
            })
            await file.save()
            return res.status(201).json("file uploaded successfully")
        } catch (error) {
            console.error(error);
            return res.status(500).json({ massege: "Something went wrong" })
        }
    }

}

export const getallvideos = async (req, res) => {
    try {
        const files = await video.find()
        return res.status(200).send(files)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ massege: "Something went wrong" })
    }
}