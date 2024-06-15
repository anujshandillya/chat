import express from 'express';
import { sendMessages, getMessages } from '../controllers/message.controllers.js';
import protectRoute from '../middleware/mSendMessage.js';
// import { get } from 'mongoose';

const router = express.Router();

router.post('/send/:id', protectRoute, sendMessages);
router.get('/:id', protectRoute, getMessages );

export default router;