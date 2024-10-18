"use client"; // Only if you are using Next.js with client components
import React, { useEffect, useState } from 'react';

interface LeaveRecord {
  _id: string;
  employeeId: {
    name: string;
    contactDetails: string; // Adjust as per your actual schema
  };
  startDate: string; // Assuming these are string dates
  endDate: string;
  reason: string;
  status: string;
}

const Leave = () => {
  const [leaveRecords, setLeaveRecords] = useState<LeaveRecord[]>([]);
  const [newLeave, setNewLeave] = useState({
    employeeId: '',
    startDate: '',
    endDate: '',
    reason: '',
  });

  // Function to fetch leave records
  const fetchLeaveRecords = async () => {
    try {
      const response = await fetch('/api/leave'); // Adjust API route if necessary
      const data = await response.json();
      setLeaveRecords(data);
    } catch (error) {
      console.error('Failed to fetch leave records:', error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/leave', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLeave),
      });
      const result = await response.json();
      if (response.ok) {
        // Reset the form and fetch new records
        setNewLeave({ employeeId: '', startDate: '', endDate: '', reason: '' });
        fetchLeaveRecords();
      } else {
        console.error('Failed to add leave record:', result.message);
      }
    } catch (error) {
      console.error('Error submitting leave record:', error);
    }
  };

  useEffect(() => {
    fetchLeaveRecords();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Leave Records</h1>
        
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full bg-gray-800 border border-gray-700">
            <thead>
              <tr>
                <th className="border-b py-2 px-4 text-left">Employee</th>
                <th className="border-b py-2 px-4 text-left">Start Date</th>
                <th className="border-b py-2 px-4 text-left">End Date</th>
                <th className="border-b py-2 px-4 text-left">Reason</th>
                <th className="border-b py-2 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveRecords.map(record => (
                <tr key={record._id} className="hover:bg-gray-700">
                  <td className="border-b py-2 px-4">{record.employeeId.name}</td>
                  <td className="border-b py-2 px-4">{new Date(record.startDate).toLocaleDateString()}</td>
                  <td className="border-b py-2 px-4">{new Date(record.endDate).toLocaleDateString()}</td>
                  <td className="border-b py-2 px-4">{record.reason}</td>
                  <td className="border-b py-2 px-4">{record.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-bold mt-6 mb-2">Request Leave</h2>
        <form onSubmit={handleSubmit} className="space-y-4 bg-gray-800 p-4 rounded-lg shadow-lg">
          <div>
            <label className="block mb-2">Employee ID</label>
            <input
              type="text"
              value={newLeave.employeeId}
              onChange={(e) => setNewLeave({ ...newLeave, employeeId: e.target.value })}
              required
              className="border border-gray-600 bg-gray-900 text-white p-2 w-full rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Start Date</label>
            <input
              type="date"
              value={newLeave.startDate}
              onChange={(e) => setNewLeave({ ...newLeave, startDate: e.target.value })}
              required
              className="border border-gray-600 bg-gray-900 text-white p-2 w-full rounded"
            />
          </div>
          <div>
            <label className="block mb-2">End Date</label>
            <input
              type="date"
              value={newLeave.endDate}
              onChange={(e) => setNewLeave({ ...newLeave, endDate: e.target.value })}
              required
              className="border border-gray-600 bg-gray-900 text-white p-2 w-full rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Reason</label>
            <textarea
              value={newLeave.reason}
              onChange={(e) => setNewLeave({ ...newLeave, reason: e.target.value })}
              required
              className="border border-gray-600 bg-gray-900 text-white p-2 w-full rounded"
            />
          </div>
          <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded transition">Submit Leave Request</button>
        </form>
      </div>
    </div>
  );
}

export default Leave;
