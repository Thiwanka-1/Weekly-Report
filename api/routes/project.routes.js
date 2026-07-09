import express from 'express';
import { createProject, getProjects, deleteProject } from '../controllers/project.controller.js';
import { protect, authorize } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
    .get(protect, getProjects) // Anyone logged in can view projects
    .post(protect, authorize('Manager'), createProject); // Only Managers can create

router.route('/:id')
    .delete(protect, authorize('Manager'), deleteProject); // Only Managers can delete

export default router;