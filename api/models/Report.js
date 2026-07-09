import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
    {
        userId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User', 
            required: true 
        },
        weekStartDate: { 
            type: Date, 
            required: true 
        },
        weekEndDate: { 
            type: Date, 
            required: true 
        },
        projectId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Project', 
            required: true 
        },
        tasksCompleted: { 
            type: String, 
            required: true 
        },
        tasksPlanned: { 
            type: String, 
            required: true 
        },
        blockers: { 
            type: String, 
            required: true 
        },
        hoursWorked: { 
            type: Number 
        },
        notes: { 
            type: String 
        },
        submissionDate: { 
            type: Date, 
            default: Date.now 
        }
    },
    { timestamps: true }
);

export default mongoose.model('Report', reportSchema);