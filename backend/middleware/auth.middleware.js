import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            res.send(401).json({ message: "Unauthorized----No Token" })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded);
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            res.send(401).json({ message: "Unauthorized----No Token" })
        }
        req.user = user;
        next()
    } catch (error) {
        console.error("Error in protectRoute middleware. ", error);
    }
}

