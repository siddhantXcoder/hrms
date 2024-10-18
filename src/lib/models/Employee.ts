// models/Employee.ts
import mongoose, { Document, Schema } from 'mongoose';

// Define an interface for Employee document
export interface Employee extends Document {
  name: string;
  contactDetails: string;
  jobRole: string;
  department: string; // Added department field
  salary: number;
  performanceHistory: string[]; // Use an array for performance history
  documents: string[]; // Use an array for document URLs
}

// Create the Employee Schema
const EmployeeSchema : Schema<Employee> = new Schema({
  name: { type: String, required: true },
  contactDetails: { type: String, required: true },
  jobRole: { type: String, required: true },
  department: { type: String, required: true }, // Ensure department is required
  salary: { type: Number, required: true },
  performanceHistory: [{ type: String }],
  documents: [{ type: String }], // URLs or paths to documents
});

// Export the Employee model
export default mongoose.models.Employee || mongoose.model<Employee>('Employee', EmployeeSchema);
