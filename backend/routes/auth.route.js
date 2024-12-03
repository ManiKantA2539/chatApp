import express from 'express';
import { check, login, logout, signup, updateProfile } from '../controllers/auth.controller.js';
import { protectedRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/updateProfile", protectedRoute, updateProfile);
router.get("/check", protectedRoute, check)

export default router;