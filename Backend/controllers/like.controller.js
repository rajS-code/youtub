import Video from "../models/video.model.js"
import Like from "../models/likedVideo.model.js"

export const handleLike = async (req, res) => {
    const { userId } = req.body
    const { videoId } = req.params
    try {
        const existingLike = await Like.findOne({ viewer: userId, videoId: videoId })
        if (existingLike) {
            await Like.findByIdAndDelete(existingLike._id)
            await Video.findByIdAndUpdate(videoId, { $inc: { Like: - 1 } })
            return res.status(201).json({ Liked: false })
        } else {
            await Like.create({
                viewer: userId,
                videoId: videoId,
            })
            await Video.findByIdAndUpdate(videoId, { $inc: { Like: 1 } })
            return res.status(200).json({ Liked: true })
        }
    } catch (error) {
        console.error(error);
        return res.json({ error: "Something went wrong" })
    }
}

export const getAllLikedVideos = async (req, res) => {
    const { userId } = req.params;
    try {
        const likedVideo = await Like
            .find({ viewer: userId })
            .populate({ path: "videoId", model: "Video" })
            .exec()
        return res.status(200).json({ likedVideo })
    } catch (error) {
        console.error(error);
        return res.json({ error: "Something went wrong" })
    }
} 