import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
    {
        name: { 
            type: String, 
            required: true, 
            unique: true 
        },
        description: { 
            type: String 
        },
        assignedMembers: [
            { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'User' 
            }
        ],
        isActive: { 
            type: Boolean, 
            default: true 
        }
    },
    { timestamps: true }
);

export default mongoose.model('Project', projectSchema);