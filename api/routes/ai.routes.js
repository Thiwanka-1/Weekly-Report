import express from 'express';
import { askAssistant } from '../controllers/ai.controller.js';
import { protect, authorize } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Only managers should be using the AI to analyze team data
router.post('/chat', protect, authorize('Manager'), askAssistant);

export default router;