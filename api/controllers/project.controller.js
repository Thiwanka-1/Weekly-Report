import Project from '../models/Project.js';

// @desc    Create a new project/category
// @access  Private/Manager
export const createProject = async (req, res) => {
    try {
        const { name, description, assignedMembers } = req.body;
        const project = await Project.create({ name, description, assignedMembers });
        res.status(201).json(project);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all active projects (For dropdowns in the frontend)
// @access  Private (Both Members and Managers)
export const getProjects = async (req, res) => {
    try {
        // Only fetch projects where isActive is true
        const projects = await Project.find({ isActive: true }).populate('assignedMembers', 'name email');
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Soft delete a project
// @access  Private/Manager
export const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        // Soft delete: keep the data for old reports, but hide it from new ones
        project.isActive = false; 
        await project.save();
        
        res.status(200).json({ message: 'Project removed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};