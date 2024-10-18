// models/Performance.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface Performance extends Document{
    employeeId: Schema.Types.ObjectId,
    goals: string,
    reviews: string,
    developmentPlans: string,
}

const PerformanceSchema : Schema<Performance> = new Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  goals: [{ type: String }],
  reviews: [{ type: String }],
  developmentPlans: [{ type: String }],
});

export default mongoose.models.Performance || mongoose.model<Performance>('Performance', PerformanceSchema);
