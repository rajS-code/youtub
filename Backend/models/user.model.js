import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    channelname: { type: String, required: false },
    description: { type: String, required: false },
    password: { type: String, required: false },
    image: { type: String },
    createdAt: { type: Date, default: Date.now }
})

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;