// app/api/payroll/route.ts
import connect from "@/lib/db"; // Your database connection file
import Payroll from "@/lib/models/Payroll"; // Your Payroll model
import { NextResponse } from "next/server";

// Get all payroll records
export const GET = async () => {
  await connect();
  try {
    const payrolls = await Payroll.find({}).populate('employeeId', 'name'); // Populate employeeId with name field
    return NextResponse.json(payrolls, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching payroll records:", error);
    return NextResponse.json({ message: "Failed to fetch payroll records" }, { status: 500 });
  }
};

// Add new payroll record
export const POST = async (req: Request) => {
  await connect();
  try {
    const body = await req.json(); // Parse the request body
    const newPayroll = new Payroll(body);
    await newPayroll.save();
    return NextResponse.json(newPayroll, { status: 201 });
  } catch (error: any) {
    console.error('Error creating payroll record:', error);
    return NextResponse.json({ message: 'Failed to create payroll record', error: error.message }, { status: 400 });
  }
};

// Update payroll record (PUT method)
export const PUT = async (req: Request) => {
  await connect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id"); // Get the payroll ID from query parameters

  try {
    const body = await req.json();
    const updatedPayroll = await Payroll.findByIdAndUpdate(id, body, { new: true });
    if (!updatedPayroll) {
      return NextResponse.json({ message: "Payroll record not found" }, { status: 404 });
    }
    return NextResponse.json(updatedPayroll, { status: 200 });
  } catch (error: any) {
    console.error("Error updating payroll record:", error);
    return NextResponse.json({ message: "Failed to update payroll record" }, { status: 400 });
  }
};

// Delete payroll record (DELETE method)
export const DELETE = async (req: Request) => {
  await connect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id"); // Get the payroll ID from query parameters

  try {
    const deletedPayroll = await Payroll.findByIdAndDelete(id);
    if (!deletedPayroll) {
      return NextResponse.json({ message: "Payroll record not found" }, { status: 404 });
    }
    return NextResponse.json(null, { status: 204 });
  } catch (error: any) {
    console.error("Error deleting payroll record:", error);
    return NextResponse.json({ message: "Failed to delete payroll record" }, { status: 400 });
  }
};
