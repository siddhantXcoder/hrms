"use client"
import React, { useState } from 'react';
import axios from 'axios';

const AddEmployee: React.FC = () => {
  const [name, setName] = useState('');
  const [contactDetails, setContactDetails] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [department, setDepartment] = useState('');
  const [salary, setSalary] = useState<number | string>('');
  const [performanceHistory, setPerformanceHistory] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newEmployee = {
        name,
        contactDetails,
        jobRole,
        department,
        salary,
        performanceHistory,
      };
      await axios.post('http://localhost:3000/api/employee', newEmployee); // Adjust the API path if necessary
      setSuccessMessage('Employee added successfully!');
      setError(null);
      // Reset the form
      setName('');
      setContactDetails('');
      setJobRole('');
      setDepartment('');
      setSalary('');
      setPerformanceHistory([]);
    } catch (err: any) {
      setError('Failed to add employee: ' + err.message);
      setSuccessMessage(null);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  p-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4 text-white text-center">Add Employee</h1>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {successMessage && <div className="text-green-500 text-center mb-4">{successMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white mb-1" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              className="w-full p-2 rounded bg-gray-700 text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-1" htmlFor="contactDetails">Contact Details</label>
            <input
              type="text"
              id="contactDetails"
              className="w-full p-2 rounded bg-gray-700 text-white"
              value={contactDetails}
              onChange={(e) => setContactDetails(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-1" htmlFor="jobRole">Job Role</label>
            <input
              type="text"
              id="jobRole"
              className="w-full p-2 rounded bg-gray-700 text-white"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-1" htmlFor="department">Department</label>
            <input
              type="text"
              id="department"
              className="w-full p-2 rounded bg-gray-700 text-white"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-1" htmlFor="salary">Salary</label>
            <input
              type="number"
              id="salary"
              className="w-full p-2 rounded bg-gray-700 text-white"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-1" htmlFor="performanceHistory">Performance History (comma separated)</label>
            <input
              type="text"
              id="performanceHistory"
              className="w-full p-2 rounded bg-gray-700 text-white"
              value={performanceHistory.join(', ')}
              onChange={(e) => setPerformanceHistory(e.target.value.split(',').map(item => item.trim()))}
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded">
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
