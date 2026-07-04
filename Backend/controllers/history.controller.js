import Video from "../models/video.model.js"
import history from "../models/history.model.js"

export const handleHistory = async (req, res) => {
    const { userId } = req.body;
    const { videoId } = req.params;

    try {
        await history.findOneAndUpdate(
            {
                viewer: userId,
                videoId,
            },
            {
                $set: {
                    watchedon: new Date(),
                },
            },
            {
                upsert: true,
                returnDocument: "after",
            }
        );

        await Video.findByIdAndUpdate(videoId, {
            $inc: { views: 1 },
        });

        return res.status(200).json({
            addedToHistory: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Something went wrong",
        });
    }
};

export const handleViews = async (req, res) => {
    const { videoId } = req.params
    try {
        await Video.findByIdAndUpdate(videoId, { $inc: { views: 1 } })
        return res.status(200).json({ addedToHistory: true })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Something went wrong" })
    }
}

export const getAllHistoryVideos = async (req, res) => {
    const { userId } = req.params;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const historyVideo = await history
            .find({ viewer: userId })
            .sort({ updatedAt: -1 })
            .limit(limit)
            .populate({
                path: "videoId",
                model: "Video",
            });

        return res.status(200).json({ historyVideo });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: error.message,
        });
    }
};
// export const getAllHistoryVideos = async (req, res) => {
//     const { userId } = req.params;
//     const limit = parseInt(req.query.limit) || 10;

//     try {
//         const historyVideos = await history.aggregate([
//             {
//                 $match: {
//                     viewer: new mongoose.Types.ObjectId(userId),
//                 },
//             },

//             // Recent views first
//             {
//                 $sort: {
//                     createdAt: -1,
//                 },
//             },

//             // Remove duplicates and keep latest view
//             {
//                 $group: {
//                     _id: "$videoId",
//                     latestHistory: { $first: "$$ROOT" },
//                 },
//             },

//             // Again sort by latest viewed time
//             {
//                 $sort: {
//                     "latestHistory.createdAt": -1,
//                 },
//             },

//             // Apply limit
//             {
//                 $limit: limit,
//             },

//             // Populate video data
//             {
//                 $lookup: {
//                     from: "videos",
//                     localField: "_id",
//                     foreignField: "_id",
//                     as: "video",
//                 },
//             },

//             {
//                 $unwind: "$video",
//             },

//             {
//                 $replaceRoot: {
//                     newRoot: "$video",
//                 },
//             },
//         ]);

//         return res.status(200).json(historyVideos);
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             error: error.message,
//         });
//     }
// };