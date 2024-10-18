// app/api/performance/route.ts
import connect from "@/lib/db"; // Your database connection file
import Performance from "@/lib/models/Performance"; // Your Performance model
import { NextResponse } from "next/server";

// Get all performance records
export const GET = async () => {
  await connect();
  try {
    const performances = await Performance.find({}).populate('employeeId', 'name'); // Populate employeeId with name field
    return NextResponse.json(performances, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching performance records:", error);
    return NextResponse.json({ message: "Failed to fetch performance records" }, { status: 500 });
  }
};

// Add new performance record
export const POST = async (req: Request) => {
  await connect();
  try {
    const body = await req.json(); // Parse the request body
    const newPerformance = new Performance(body);
    await newPerformance.save();
    return NextResponse.json(newPerformance, { status: 201 });
  } catch (error: any) {
    console.error('Error creating performance record:', error);
    return NextResponse.json({ message: 'Failed to create performance record', error: error.message }, { status: 400 });
  }
};

// Update performance record (PUT method)
export const PUT = async (req: Request) => {
  await connect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id"); // Get the performance ID from query parameters

  try {
    const body = await req.json();
    const updatedPerformance = await Performance.findByIdAndUpdate(id, body, { new: true });
    if (!updatedPerformance) {
      return NextResponse.json({ message: "Performance record not found" }, { status: 404 });
    }
    return NextResponse.json(updatedPerformance, { status: 200 });
  } catch (error: any) {
    console.error("Error updating performance record:", error);
    return NextResponse.json({ message: "Failed to update performance record" }, { status: 400 });
  }
};

// Delete performance record (DELETE method)
export const DELETE = async (req: Request) => {
  await connect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id"); // Get the performance ID from query parameters

  try {
    const deletedPerformance = await Performance.findByIdAndDelete(id);
    if (!deletedPerformance) {
      return NextResponse.json({ message: "Performance record not found" }, { status: 404 });
    }
    return NextResponse.json(null, { status: 204 });
  } catch (error: any) {
    console.error("Error deleting performance record:", error);
    return NextResponse.json({ message: "Failed to delete performance record" }, { status: 400 });
  }
};
