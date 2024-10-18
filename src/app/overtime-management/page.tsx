"use client"; // Only if you are using Next.js with client components
import React, { useEffect, useState } from 'react';

interface OvertimeRecord {
  _id: string;
  employeeId: {
    name: string;
    contactDetails: string; // Adjust as per your actual schema
  };
  date: string; // Assuming these are string dates
  hours: number;
  reason: string;
  status: string;
}

const Overtime = () => {
  const [overtimeRecords, setOvertimeRecords] = useState<OvertimeRecord[]>([]);
  const [newOvertime, setNewOvertime] = useState({
    employeeId: '',
    date: '',
    hours: 0,
    reason: '',
  });

  // Function to fetch overtime records
  const fetchOvertimeRecords = async () => {
    try {
      const response = await fetch('/api/overtime'); // Adjust API route if necessary
      const data = await response.json();
      setOvertimeRecords(data);
    } catch (error) {
      console.error('Failed to fetch overtime records:', error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/overtime', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOvertime),
      });
      const result = await response.json();
      if (response.ok) {
        // Reset the form and fetch new records
        setNewOvertime({ employeeId: '', date: '', hours: 0, reason: '' });
        fetchOvertimeRecords();
      } else {
        console.error('Failed to add overtime record:', result.message);
      }
    } catch (error) {
      console.error('Error submitting overtime record:', error);
    }
  };

  useEffect(() => {
    fetchOvertimeRecords();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Overtime Records</h1>
        
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full bg-gray-800 border border-gray-700">
            <thead>
              <tr>
                <th className="border-b py-2 px-4 text-left">Employee</th>
                <th className="border-b py-2 px-4 text-left">Date</th>
                <th className="border-b py-2 px-4 text-left">Hours</th>
                <th className="border-b py-2 px-4 text-left">Reason</th>
                <th className="border-b py-2 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {overtimeRecords.map(record => (
                <tr key={record._id} className="hover:bg-gray-700">
                  <td className="border-b py-2 px-4">{record.employeeId.name}</td>
                  <td className="border-b py-2 px-4">{new Date(record.date).toLocaleDateString()}</td>
                  <td className="border-b py-2 px-4">{record.hours}</td>
                  <td className="border-b py-2 px-4">{record.reason}</td>
                  <td className="border-b py-2 px-4">{record.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-bold mt-6 mb-2">Request Overtime</h2>
        <form onSubmit={handleSubmit} className="space-y-4 bg-gray-800 p-4 rounded-lg shadow-lg">
          <div>
            <label className="block mb-2">Employee ID</label>
            <input
              type="text"
              value={newOvertime.employeeId}
              onChange={(e) => setNewOvertime({ ...newOvertime, employeeId: e.target.value })}
              required
              className="border border-gray-600 bg-gray-900 text-white p-2 w-full rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Date</label>
            <input
              type="date"
              value={newOvertime.date}
              onChange={(e) => setNewOvertime({ ...newOvertime, date: e.target.value })}
              required
              className="border border-gray-600 bg-gray-900 text-white p-2 w-full rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Hours</label>
            <input
              type="number"
              value={newOvertime.hours}
              onChange={(e) => setNewOvertime({ ...newOvertime, hours: +e.target.value })}
              required
              className="border border-gray-600 bg-gray-900 text-white p-2 w-full rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Reason</label>
            <textarea
              value={newOvertime.reason}
              onChange={(e) => setNewOvertime({ ...newOvertime, reason: e.target.value })}
              required
              className="border border-gray-600 bg-gray-900 text-white p-2 w-full rounded"
            />
          </div>
          <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded transition">Submit Overtime Request</button>
        </form>
      </div>
    </div>
  );
}

export default Overtime;
