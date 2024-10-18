// models/Benefits.ts
import mongoose, { Schema } from 'mongoose';


export interface Benefits extends Document {
    employeeId: Schema.Types.ObjectId,
  healthInsurance: boolean,
  retirementPlan: boolean,
  benefitUsage: string,
}

const BenefitsSchema : Schema<Benefits> = new Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  healthInsurance: { type: Boolean, default: false },
  retirementPlan: { type: Boolean, default: false },
  benefitUsage: [{ type: String }],
});

export default mongoose.models.Benefits || mongoose.model<Benefits>('Benefits', BenefitsSchema);
