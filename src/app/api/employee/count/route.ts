// In your API route (e.g., api/employees/count.ts)

import connect from "@/lib/db";
import Employee from "@/lib/models/Employee";
import { NextResponse } from "next/server";

export const GET = async () => {
  await connect();
  try {
    const count = await Employee.countDocuments(); // Get the count of employees
    return NextResponse.json({ count }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching employee count:", error);
    return NextResponse.json({ message: "Failed to fetch employee count" }, { status: 500 });
  }
};
