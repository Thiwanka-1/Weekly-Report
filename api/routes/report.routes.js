import express from 'express';
import { createReport, getMyReports, getTeamReports } from '../controllers/report.controller.js';
import { protect, authorize } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Personal routes
router.route('/')
    .post(protect, createReport)
    .get(protect, getMyReports);

// Manager dashboard route
router.route('/team')
    .get(protect, authorize('Manager'), getTeamReports);

export default router;