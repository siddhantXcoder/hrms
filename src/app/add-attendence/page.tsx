"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

interface AttendanceRecord {
  _id: string;
  employeeId: {
    _id: string;
    name: string;
    contactDetails: string;
  };
  date: string;
  status: string;
  overtimeHours: number;
}

interface Employee {
  _id: string;
  name: string;
  contactDetails: string;
}

const Attendance: React.FC = () => {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [employeeId, setEmployeeId] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [status, setStatus] = useState<string>("present");
  const [overtimeHours, setOvertimeHours] = useState<number>(0);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      try {
        const response = await axios.get<AttendanceRecord[]>("http://localhost:3000/api/attendance");
        setAttendanceRecords(response.data);
      } catch (error: any) {
        console.error("Error fetching attendance records:", error);
      }
    };

    const fetchEmployees = async () => {
      try {
        const response = await axios.get<Employee[]>("http://localhost:3000/api/employee");
        setEmployees(response.data);
      } catch (error: any) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchAttendanceRecords();
    fetchEmployees();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newAttendance = {
        employeeId,
        date,
        status,
        overtimeHours,
      };

      if (editingId) {
        // Update existing record
        await axios.put(`http://localhost:3000/api/attendance?id=${editingId}`, newAttendance);
        setSuccessMessage("Attendance record updated successfully!");
      } else {
        // Create new record
        await axios.post("http://localhost:3000/api/attendance", newAttendance);
        setSuccessMessage("Attendance record added successfully!");
      }

      setErrorMessage("");
      setEditingId(null);
      setEmployeeId("");
      setDate("");
      setOvertimeHours(0);
      
      // Fetch attendance records again after adding or updating
      await fetchAttendanceRecords(); // Call the function to refresh the records
    } catch (error: any) {
      setErrorMessage("Failed to save attendance record: " + error.message);
      setSuccessMessage("");
    }
  };

  const fetchAttendanceRecords = async () => {
    try {
      const response = await axios.get<AttendanceRecord[]>("http://localhost:3000/api/attendance");
      setAttendanceRecords(response.data);
    } catch (error: any) {
      console.error("Error fetching attendance records:", error);
    }
  };

  const handleEdit = (record: AttendanceRecord) => {
    setEditingId(record._id);
    setEmployeeId(record.employeeId._id);
    setDate(record.date.split("T")[0]); // Format date for input
    setStatus(record.status);
    setOvertimeHours(record.overtimeHours);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this record?")) {
      try {
        await axios.delete(`http://localhost:3000/api/attendance?id=${id}`);
        setSuccessMessage("Attendance record deleted successfully!");
        await fetchAttendanceRecords(); // Refresh records
      } catch (error: any) {
        setErrorMessage("Failed to delete attendance record: " + error.message);
        setSuccessMessage("");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 p-6">
      <div className="container mx-auto bg-gray-900 text-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-semibold mb-4 text-center">Attendance Tracking</h1>
        {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
        {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <label className="block mb-1">Employee</label>
            <select
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              required
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none"
            >
              <option value="" disabled>Select an employee</option>
              {employees.map((employee) => (
                <option key={employee._id} value={employee._id}>{employee.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none"
            />
          </div>
          <div>
            <label className="block mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none"
            >
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              <option value="leave">Leave</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Overtime Hours</label>
            <input
              type="number"
              value={overtimeHours}
              onChange={(e) => setOvertimeHours(Number(e.target.value))}
              min="0"
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none"
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded">
            {editingId ? "Update Attendance" : "Add Attendance"}
          </button>
        </form>

        <h2 className="text-xl font-semibold mb-4">Attendance Records</h2>
        <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="p-4">Employee Name</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
              <th className="p-4">Overtime Hours</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords.map((record) => (
              <tr key={record._id} className="bg-gray-800 border-b border-gray-700">
                <td className="p-4">{record.employeeId.name}</td>
                <td className="p-4">{new Date(record.date).toLocaleDateString()}</td>
                <td className="p-4">{record.status}</td>
                <td className="p-4">{record.overtimeHours}</td>
                <td className="p-4 flex space-x-2">
                  <button onClick={() => handleEdit(record)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                  <button onClick={() => handleDelete(record._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
