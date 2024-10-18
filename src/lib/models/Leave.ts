// models/Leave.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface Leave extends Document {
    employeeId: Schema.Types.ObjectId;
    startDate: Date;
    endDate: Date;
    reason: string;
    status: string; // e.g., "approved", "pending", "rejected"
}

const LeaveSchema: Schema<Leave> = new Schema({
    employeeId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Employee', 
        required: true 
    },
    startDate: { 
        type: Date, 
        required: true 
    },
    endDate: { 
        type: Date, 
        required: true 
    },
    reason: { 
        type: String, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['approved', 'pending', 'rejected'], 
        default: 'pending' // Default status is 'pending'
    }
}, { 
    timestamps: true // Adds createdAt and updatedAt fields
});

export default mongoose.models.Leave || mongoose.model<Leave>('Leave', LeaveSchema);
