// models/Payroll.ts
import mongoose, { Schema } from 'mongoose';

export interface Payroll extends Document {
  employeeId: Schema.Types.ObjectId,
  salary: number,
  deductions: number,
  payDate: Date,
}

const PayrollSchema : Schema<Payroll> = new Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  salary: { type: Number, required: true },
  deductions: { type: Number, default: 0 },
  payDate: { type: Date, required: true },
});

export default mongoose.models.Payroll || mongoose.model<Payroll>('Payroll', PayrollSchema);
