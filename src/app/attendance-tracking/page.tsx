"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

const Attendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/attendance'); // Adjust the API path if necessary
        setAttendanceRecords(response.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceRecords();
  }, []);

  if (loading) {
    return <div className="text-white">Loading attendance records...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="container mx-auto bg-gray-900 text-white rounded-lg shadow-lg p-4">
        <h1 className="text-2xl font-semibold mb-4 text-center">Attendance Tracking</h1>
        
        <h2 className="text-xl font-semibold mb-2 text-center">Attendance Records</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-700 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-600 text-gray-200 text-left text-sm leading-normal">
                <th className="py-3 px-6">Employee Name</th>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Overtime Hours</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((record) => (
                <tr key={record._id} className="border-b border-gray-500 hover:bg-gray-600">
                  <td className="py-3 px-6">{record.employeeId.name}</td> {/* Accessing the employee name */}
                  <td className="py-3 px-6">{new Date(record.date).toLocaleDateString()}</td>
                  <td className="py-3 px-6">{record.status}</td>
                  <td className="py-3 px-6">{record.overtimeHours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
