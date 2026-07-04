import Comment from "../models/comments.model.js"
import mongoose from "mongoose"

export const postComment = async (req, res) => {
    const commentData = req.body
    const postComment = new Comment(commentData)

    try {
        await postComment.save()
        return res.status(200).json({ comment: true })
    } catch (error) {
        console.log("error:", error);
        return res.status(500).json({ message: "Something went wrong" })
    }
}

export const getAllComments = async (req, res) => {
    const { videoId } = req.params;
    try {
        const commentVideo = await Comment.find({ videoId: videoId })
        return res.status(200).json({ commentVideo })
    } catch (error) {
        console.error("error:", error);
        return res.json({ error: error })
    }
}

export const deleteComment = async (req, res) => {
    const { id: _id } = req.params
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        res.status(404).json("comment unavailable")
    }
    try {
        await Comment.findByIdAndDelete(_id)
        return res.status(200).json({ comment: false })
    } catch (error) {
        console.log("error:", error);
        return res.json({ error: "Something went wrong" })
    }
}

export const editComment = async (req, res) => {
    const { id: _id } = req.params
    const { commentbody } = req.body
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        res.status(404).json("comment unavailable")
    }

    try {
        const updatedComment = await Comment.findByIdAndUpdate(_id,
            {
                $set: { "commentbody": commentbody },
            },
            {
                new: true,
            })
        return res.status(201).json({
            success: true,
            comment: updatedComment,
        });
    } catch (error) {
        console.log("error:", error);
        return res.json({ error: "Something went wrong" })
    }
}