import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {

    const { fullName, email, password } = req.body;
    try {
        if (password.length < 6) {
            return res.status(400).json({ message: "Password cant be short!!!" });
        }

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "User already exists!!!" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            password: hashedPassword,
            fullName
        });

        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();

            console.log("User Created Successfully.")
            res.status(201).json({
                id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            })
        }
        else {
            res.status(400).json({ message: "Invalid User details" });
        }
    } catch (error) {
        console.error("Error in Sign-up. ", error);
        res.status(500).json("Internal Sever error");
    }

}
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "You dont have account with that email!!!" });
        }
        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
            return res.status(400).json({ message: "Invalid Password!!!" });
        }
        generateToken(user._id, res);
        return res.status(200).json({
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        })
    } catch (error) {
        console.error("Error in login. ", error);
        res.status(500).json("Internal Sever error");

    }
}
export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        console.log("User logged out!!!");
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Error in logout. ", error);
        res.status(500).json({ message: "Internal Server error" })
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        if (!profilePic) {
            res.status(400).json({ message: "Profile Photo is required" });
        }
        const user_id = req.user.userId;
        const uploadedResponse = await cloudinary.uploader.upload(profilePic);

        const user = await User.findByIdAndUpdate(user_id, { profilePic: uploadedResponse.secure_url }, { new: true });

        res.status(200).json(user);
    } catch (error) {
        console.error("Error in Update Profile. ", error);
        res.status(500).json({ message: "Internal Server error" })
    }

}

export const check = async (req, res, next) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth", error);
        res.status(500).json({ message: "Internal Server error" })
    }
}