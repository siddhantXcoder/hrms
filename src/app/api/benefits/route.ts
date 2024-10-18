// app/api/benefits/route.ts
import connect from "@/lib/db"; // Your database connection file
import Benefits from "@/lib/models/Benefit"; // Your Benefits model
import { NextResponse } from "next/server";

// Get all benefits
export const GET = async () => {
  await connect();
  try {
    const benefits = await Benefits.find({});
    return NextResponse.json(benefits, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching benefits:", error);
    return NextResponse.json({ message: "Failed to fetch benefits" }, { status: 500 });
  }
};

// Add new benefits
export const POST = async (req: Request) => {
  await connect();
  try {
    const body = await req.json(); // Parse the request body
    const newBenefits = new Benefits(body);
    await newBenefits.save();
    return NextResponse.json(newBenefits, { status: 201 });
  } catch (error: any) {
    console.error('Error creating benefits:', error);
    return NextResponse.json({ message: 'Failed to create benefits', error: error.message }, { status: 400 });
  }
};

// Update benefits (PUT method)
export const PUT = async (req: Request) => {
  await connect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id"); // Get the benefits ID from query parameters

  try {
    const body = await req.json();
    const updatedBenefits = await Benefits.findByIdAndUpdate(id, body, { new: true });
    if (!updatedBenefits) {
      return NextResponse.json({ message: "Benefits not found" }, { status: 404 });
    }
    return NextResponse.json(updatedBenefits, { status: 200 });
  } catch (error: any) {
    console.error("Error updating benefits:", error);
    return NextResponse.json({ message: "Failed to update benefits" }, { status: 400 });
  }
};

// Delete benefits (DELETE method)
export const DELETE = async (req: Request) => {
  await connect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id"); // Get the benefits ID from query parameters

  try {
    const deletedBenefits = await Benefits.findByIdAndDelete(id);
    if (!deletedBenefits) {
      return NextResponse.json({ message: "Benefits not found" }, { status: 404 });
    }
    return NextResponse.json(null, { status: 204 });
  } catch (error: any) {
    console.error("Error deleting benefits:", error);
    return NextResponse.json({ message: "Failed to delete benefits" }, { status: 400 });
  }
};
