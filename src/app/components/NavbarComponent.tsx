"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // For handling redirects
import { HoveredLink, Menu, MenuItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utlis"; // Corrected the import path
import { UserButton } from "@clerk/nextjs";

export function NavbarComponent() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-4" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>("Dashboard"); // Dashboard as default
  const router = useRouter();

  // Redirect to the dashboard on initial render
  useEffect(() => {
    if (active === "Dashboard") {
      router.push("/dashboard-overview");
    }
  }, [active, router]);

  return (
    <div className={cn("fixed top-10 inset-x-0 max-w-2xl items-center justify-center mx-auto z-50", className)}>
      <Menu setActive={setActive}>
        {/* Dashboard Menu */}
        <MenuItem setActive={setActive} active={active} item="Dashboard">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/dashboard-overview">Overview</HoveredLink>
            <HoveredLink href="/employee-stats">Employee Stats</HoveredLink>
            <HoveredLink href="/performance-reports">Performance Reports</HoveredLink>
          </div>
        </MenuItem>

        {/* Employee Menu */}
        <MenuItem setActive={setActive} active={active} item="Employee">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/employee-list">Employee List</HoveredLink>
            <HoveredLink href="/add-employee">Add Employee</HoveredLink>
            <HoveredLink href="/documents">Document Management</HoveredLink>
          </div>
        </MenuItem>

        {/* Attendance Menu */}
        <MenuItem setActive={setActive} active={active} item="Attendance">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/attendance-tracking">Attendance Tracking</HoveredLink>
            <HoveredLink href="/add-attendence">Add Attendence</HoveredLink>
            <HoveredLink href="/leave-management">Leave Management</HoveredLink>
            <HoveredLink href="/overtime-management">Overtime Management</HoveredLink>
          </div>
        </MenuItem>

        {/* Payroll Menu */}
        <MenuItem setActive={setActive} active={active} item="Payroll">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/salary-calculations">Salary Calculations</HoveredLink>
            <HoveredLink href="/payslip-generation">Payslip Generation</HoveredLink>
          </div>
        </MenuItem>

        {/* User Button */}
        <div className="">
          <UserButton />
        </div>
      </Menu>
    </div>
  );
}
