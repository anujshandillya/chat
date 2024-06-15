import express from 'express';
import { getUserForSidebar } from '../controllers/user.controllers.js';
import protectRoute from '../middleware/mSendMessage.js';

const router = express.Router();

router.get('/', protectRoute, getUserForSidebar);

export default router;