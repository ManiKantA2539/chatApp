import cloudinary from "../lib/cloudinary.js";
import { Message } from "../models/message.model.js";
import User from "../models/user.model.js";

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
        const receiver_id = req.params.id;
        const user_messages = await Message.find({ $or: [{ senderId: sender_id, receiverId: receiver_id }, { receiverId: sender_id, senderId: receiver_id }] });
        res.status(200).json({ data: user_messages });
    } catch (error) {
        console.log(error);
        res.status(500).json("Couldn't find messages. ", { message: error.message });
    }
}

export const sendMessages = async (req, res) => {
    try {
        const { image, text, senderId, receiverId } = req.body;
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