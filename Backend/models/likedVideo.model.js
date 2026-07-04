import mongoose from "mongoose"

const likedVideoSchema = mongoose.Schema({
    viewer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    videoId: { type: mongoose.Schema.Types.ObjectId, ref: "Video", required: true },
    likedon: { type: Date, default: Date.now }
}, { timestamps: true })

export default mongoose.models.LikedVideo || mongoose.model("LikedVideo", likedVideoSchema);