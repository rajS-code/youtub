import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
    name: {type: String, required: true},
    channelimage: {type: String, required: true},
    email: {type: String, required: true},
    subscribers: {type: Number, default: 0},
    videos: {type: Number, default: 0},
    description: {type: String, required: true},
    joinedon: {type: Date, default: Date.now}
})

const Channel = mongoose.models.Channel || mongoose.model("Channel", channelSchema);

export default Channel;