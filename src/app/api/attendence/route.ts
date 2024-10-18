import connect from "@/lib/db";
import Attendance from "@/lib/models/Attendence";
import Employee from "@/lib/models/Employee"; // Import Employee model for validation
import { NextResponse } from "next/server";

// Get all attendance records
export const GET = async () => {
    await connect();
    try {
        const attendanceRecords = await Attendance.find().populate('employeeId', 'name contactDetails'); // Populate employee details
        return NextResponse.json(attendanceRecords, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching attendance records:", error);
        return NextResponse.json({ message: "Failed to fetch attendance records" }, { status: 500 });
    }
};

// Add a new attendance record
export const POST = async (req: Request) => {
    await connect();
    try {
        const body = await req.json();
        
        // Validate employeeId exists
        const employee = await Employee.findById(body.employeeId);
        if (!employee) {
            return NextResponse.json({ message: "Employee not found" }, { status: 404 });
        }

        const newAttendance = new Attendance(body);
        await newAttendance.save();
        return NextResponse.json(newAttendance, { status: 201 });
    } catch (error: any) {
        console.error('Error creating attendance record:', error);
        return NextResponse.json({ message: 'Failed to create attendance record', error: error.message }, { status: 400 });
    }
};

// Update an attendance record (PUT method)
export const PUT = async (req: Request) => {
    await connect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    try {
        const body = await req.json();
        const updatedAttendance = await Attendance.findByIdAndUpdate(id, body, { new: true });

        if (!updatedAttendance) {
            return NextResponse.json({ message: "Attendance record not found" }, { status: 404 });
        }
        return NextResponse.json(updatedAttendance, { status: 200 });
    } catch (error: any) {
        console.error("Error updating attendance record:", error);
        return NextResponse.json({ message: "Failed to update attendance record" }, { status: 400 });
    }
};

// Delete an attendance record (DELETE method)
export const DELETE = async (req: Request) => {
    await connect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    try {
        const deletedAttendance = await Attendance.findByIdAndDelete(id);
        if (!deletedAttendance) {
            return NextResponse.json({ message: "Attendance record not found" }, { status: 404 });
        }
        return NextResponse.json(null, { status: 204 });
    } catch (error: any) {
        console.error("Error deleting attendance record:", error);
        return NextResponse.json({ message: "Failed to delete attendance record" }, { status: 400 });
    }
};
