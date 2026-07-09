import Report from '../models/Report.js';
import { generateAIResponse } from '../services/llm.service.js';

// @desc    Ask the AI a question about team activity
// @access  Private/Manager
export const askAssistant = async (req, res) => {
    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({ message: 'Please provide a question for the AI.' });
        }

        // Fetch the last 50 reports to give the AI context of what the team is doing
        // We populate the user and project names so the AI knows who did what
        const recentReports = await Report.find({})
            .sort({ weekStartDate: -1 })
            .limit(50)
            .populate('userId', 'name')
            .populate('projectId', 'name');

        // Format the database JSON into a readable string for the AI prompt
        const formattedContext = recentReports.map(report => {
            return `
            Team Member: ${report.userId?.name}
            Project: ${report.projectId?.name}
            Completed: ${report.tasksCompleted}
            Blockers: ${report.blockers}
            `;
        }).join('\n---');

        // Send the formatted data and the manager's question to Groq
        const aiResponse = await generateAIResponse(question, formattedContext);

        res.status(200).json({ answer: aiResponse });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};