import watchLater from "../models/watchLater.model.js"

export const handleWatchLater = async (req, res) => {
    const { userId } = req.body
    const { videoId } = req.params
    try {
        const existingWatchLater = await watchLater.findOne({ viewer: userId, videoId: videoId })
        if (existingWatchLater) {
            await watchLater.findByIdAndDelete(existingWatchLater._id);
            return res.status(201).json({ watchLater: false })
        } else {
            await watchLater.create({
                viewer: userId,
                videoId: videoId,
            })
            return res.status(200).json({ watchLater: true })
        }
    } catch (error) {
        console.error(error);
        return res.json({ error: "Something went wrong" })
    }
}

export const getAllWatchLaterVideos = async (req, res) => {
    const { userId } = req.params;
    try {
        const watchLaterVideos = await watchLater
            .find({ viewer: userId })
            .populate({ path: "videoId", model: "Video" })
            .exec()
        return res.status(200).json({ watchLaterVideos })
    } catch (error) {
        console.error(error);
        return res.json({ error: "Something went wrong" })
    }
} 