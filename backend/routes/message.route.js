import express from 'express';
import { protectedRoute } from '../middleware/auth.middleware.js';
import { getMessages, getSidebarUsers, sendMessages } from '../controllers/message.controller.js';


const router = express.Router();

router.get('/user', protectedRoute, getSidebarUsers);
router.get('/:id', protectedRoute, getMessages);
router.post('/send/:id', protectedRoute, sendMessages);

export default router;