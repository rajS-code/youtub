import mongoose from "mongoose"

const commentSchema = mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        videoId: { type: mongoose.Schema.Types.ObjectId, ref: "Video", required: true },
        commentbody: { type: String },
        usercommented: { type: String },
        commentedon: { type: Date, default: Date.now }
    }, { timestamps: true }
)

export default mongoose.models.Comment || mongoose.model("Comment", commentSchema);