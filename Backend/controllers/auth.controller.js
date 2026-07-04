import users from "../models/user.model.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

export const registerUser = async (req, res) => {
    const { name, email, password, channelname } = req.body;
    try {
        const existingUser = await users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists", existingUser });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await users.create({
            name,
            email,
            password: hashedPassword,
            channelname
        });
        res.status(201).json({ message: "User registered successfully", newUser });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export const signingWithGoogle = async (req, res) => {
    try {

        const { email, name, image } = req.body;

        const existingUser = await users.findOne({ email });

        if (!existingUser) {
            const username =
                email.split("@")[0] + Date.now().toString().slice(-4);

            const newUser = await users.create({
                email,
                name,
                image,
                username,
            });
            
            return res.status(201).json({
                result: newUser,
            });

        } else {

            return res.status(200).json({
                result: existingUser,
            });
        }

    } catch (error) {

        return res.status(500).json({
            message: error.message,
        });
    }
};

export const updateProfile = async (req, res) => {
    const {id:_id} = req.params;
    const {channelname, description} = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({message: "User not found"});
    try {
        const updatedUser = await users.findByIdAndUpdate(
            _id, 
            {
                $set: { channelname, description }
            }, { new: true }
        );
        console.log(updatedUser);
        
        res.json({ message: "Profile updated successfully", updatedUser });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Server error" });
    }
}
