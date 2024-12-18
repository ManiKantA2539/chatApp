import express from "express"
import { protectedRoute } from "../middleware/auth.middleware.js"
import { audioController } from "../audioControllers/audio.controller.js";

const router = express.Router();

router.post("/speech",protectedRoute,audioController);

export default router;