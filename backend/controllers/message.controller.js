import cloudinary from "../lib/cloudinary.js";
import { Message } from "../models/message.model.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";

export const getSidebarUsers = async (req, res) => {
    try {
        const logged_id = req.user._id;
        const user = await User.find({ _id: logged_id });
        const otherUsers = await User.find({ _id: { $ne: logged_id } });
        res.status(200).json({ data: otherUsers });
    } catch (error) {
        res.status(500).json("Couldn't find users. ", { message: error.message });
    }
}

export const getMessages = async (req, res) => {
    try {
        const sender_id = req.user._id;
        const receiver_id = new mongoose.Types.ObjectId(req.params.id);
        console.log(sender_id,receiver_id)
        const user_messages = await Message.find({ $or: [{ senderId: sender_id, receiverId: receiver_id }, { receiverId: sender_id, senderId: receiver_id }] });
        res.status(200).json({ data: user_messages });
    } catch (error) {
        console.log(error);
        res.status(500).json("Couldn't find messages. ", { message: error.message });
    }
}

export const sendMessages = async (req, res) => {
    try {
        const receiverId = req?.params?.id;
        const senderId = req.user._id;
        const { image, text } = req.body;
        let imgUrl;
        if (image) {
            const response = await cloudinary.uploader.upload(image);
            imgUrl = response.secure_url;
        }
        const message = new Message({ image: imgUrl, text, senderId, receiverId });
        await message.save();
        res.status(201).json({ data: message });
    } catch (error) {
        res.status(500).json("Couldn't create message. ", { message: error.message });
    }
}