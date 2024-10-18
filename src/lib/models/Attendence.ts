// models/Attendance.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface Attendance extends Document {
    employeeId: Schema.Types.ObjectId;
    date: Date;
    status: string;
    overtimeHours: number;
}

const AttendanceSchema : Schema<Attendance> = new Schema({
    employeeId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Employee', 
        required: true 
    },
    date: { 
        type: Date, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['present', 'absent', 'leave'], 
        required: true 
    },
    overtimeHours: { 
        type: Number, 
        default: 0,
        validate: {
            validator: (value: number) => value >= 0,
            message: 'Overtime hours cannot be negative.'
        }
    },
}, { 
    timestamps: true // Adds createdAt and updatedAt fields
});

// Adding index for employeeId and date combination
AttendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });

export default mongoose.models.Attendance || mongoose.model<Attendance>('Attendance', AttendanceSchema);
