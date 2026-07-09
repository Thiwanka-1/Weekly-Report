import Report from '../models/Report.js';

// @desc    Create a new weekly report
// @access  Private/Team Member
export const createReport = async (req, res) => {
    try {
        // Extract the strict fields required by the assignment
        const { weekStartDate, weekEndDate, projectId, tasksCompleted, tasksPlanned, blockers, hoursWorked, notes } = req.body;

        const report = await Report.create({
            userId: req.user._id, // Attached by the 'protect' middleware!
            weekStartDate,
            weekEndDate,
            projectId,
            tasksCompleted,
            tasksPlanned,
            blockers,
            hoursWorked,
            notes,
            submissionDate: new Date()
        });

        res.status(201).json(report);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get logged-in user's reports (Personal Page)
// @access  Private
export const getMyReports = async (req, res) => {
    try {
        // Fetch only reports belonging to the requester, sort by newest first
        const reports = await Report.find({ userId: req.user._id })
            .populate('projectId', 'name')
            .sort({ weekStartDate: -1 });
            
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all reports with filters (Team Dashboard)
// @access  Private/Manager
export const getTeamReports = async (req, res) => {
    try {
        // Grab filter queries from the URL (e.g., ?projectId=123&userId=456)
        const { projectId, userId, startDate, endDate } = req.query;
        let query = {};

        // Apply filters dynamically if they exist in the request
        if (projectId) query.projectId = projectId;
        if (userId) query.userId = userId;
        if (startDate && endDate) {
            query.weekStartDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }

        const reports = await Report.find(query)
            .populate('userId', 'name email')
            .populate('projectId', 'name')
            .sort({ weekStartDate: -1 });

        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};