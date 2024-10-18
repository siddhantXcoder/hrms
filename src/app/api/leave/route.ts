// controllers/leaveController.ts
import connect from "@/lib/db";
import Leave from "@/lib/models/Leave";
import Employee from "@/lib/models/Employee"; // Import Employee model for validation
import { NextResponse } from "next/server";

// Get all leave records
export const GET = async () => {
    await connect();
    try {
        const leaveRecords = await Leave.find().populate('employeeId', 'name contactDetails'); // Populate employee details
        return NextResponse.json(leaveRecords, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching leave records:", error);
        return NextResponse.json({ message: "Failed to fetch leave records" }, { status: 500 });
    }
};

// Add a new leave record
export const POST = async (req: Request) => {
    await connect();
    try {
        const body = await req.json();

        // Validate employeeId exists
        const employee = await Employee.findById(body.employeeId);
        if (!employee) {
            return NextResponse.json({ message: "Employee not found" }, { status: 404 });
        }

        const newLeave = new Leave(body);
        await newLeave.save();
        return NextResponse.json(newLeave, { status: 201 });
    } catch (error: any) {
        console.error('Error creating leave record:', error);
        return NextResponse.json({ message: 'Failed to create leave record', error: error.message }, { status: 400 });
    }
};

// Update a leave record (PUT method)
export const PUT = async (req: Request) => {
    await connect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    try {
        const body = await req.json();
        const updatedLeave = await Leave.findByIdAndUpdate(id, body, { new: true });

        if (!updatedLeave) {
            return NextResponse.json({ message: "Leave record not found" }, { status: 404 });
        }
        return NextResponse.json(updatedLeave, { status: 200 });
    } catch (error: any) {
        console.error("Error updating leave record:", error);
        return NextResponse.json({ message: "Failed to update leave record" }, { status: 400 });
    }
};

// Delete a leave record (DELETE method)
export const DELETE = async (req: Request) => {
    await connect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    try {
        const deletedLeave = await Leave.findByIdAndDelete(id);
        if (!deletedLeave) {
            return NextResponse.json({ message: "Leave record not found" }, { status: 404 });
        }
        return NextResponse.json(null, { status: 204 });
    } catch (error: any) {
        console.error("Error deleting leave record:", error);
        return NextResponse.json({ message: "Failed to delete leave record" }, { status: 400 });
    }
};
