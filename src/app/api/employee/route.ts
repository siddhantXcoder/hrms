import connect from "@/lib/db";
import Employee from "@/lib/models/Employee";
import { NextResponse } from "next/server";

// Get all employees
export const GET = async () => {
  await connect();
  try {
    const employees = await Employee.find({});
    return NextResponse.json(employees, { status: 200 });
  } catch (error : any) {
    console.error("Error fetching employees:", error);
    return NextResponse.json({ message: "Failed to fetch employees" }, { status: 500 });
  }
};

// Add a new employee
export const POST = async (req: Request) => {
  await connect();
  try {
    const body = await req.json(); // Use req.json() to parse the body
    const newEmployee = new Employee(body);
    await newEmployee.save();
    return NextResponse.json(newEmployee, { status: 201 });
  } catch (error : any) {
    console.error('Error creating employee:', error);
    return NextResponse.json({ message: 'Failed to create employee', error: error.message }, { status: 400 });
  }
};

// Update an employee (PUT method)
export const PUT = async (req: Request) => {
  await connect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    const body = await req.json();
    const updatedEmployee = await Employee.findByIdAndUpdate(id, body, { new: true });
    if (!updatedEmployee) {
      return NextResponse.json({ message: "Employee not found" }, { status: 404 });
    }
    return NextResponse.json(updatedEmployee, { status: 200 });
  } catch (error : any) {
    console.error("Error updating employee:", error);
    return NextResponse.json({ message: "Failed to update employee" }, { status: 400 });
  }
};

// Delete an employee (DELETE method)
export const DELETE = async (req: Request) => {
  await connect();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  try {
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return NextResponse.json({ message: "Employee not found" }, { status: 404 });
    }
    return NextResponse.json(null, { status: 204 });
  } catch (error : any) {
    console.error("Error deleting employee:", error);
    return NextResponse.json({ message: "Failed to delete employee" }, { status: 400 });
  }
};
