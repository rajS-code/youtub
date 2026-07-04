import mongoose from "mongoose"

const watchLaterSchema = mongoose.Schema(
    {
        viewer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        videoId: { type: mongoose.Schema.Types.ObjectId, ref: "Video", required: true },
        watchedon: { type: Date, default: Date.now }
    }, { timestamps: true }
)

export default mongoose.models.WatchLater || mongoose.model("WatchLater", watchLaterSchema);