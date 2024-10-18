"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define the Employee interface
interface Employee {
  _id: string; // MongoDB ID
  name: string;
  jobRole: string;
  department: string;
  salary: number;
  performanceHistory: string[];
}

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/employee'); // Adjust the API path if necessary
        setEmployees(response.data);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) {
    return <div className="text-white text-center">Loading employees...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4 text-white text-center">Employee List</h1>
        <table className="min-w-full bg-gray-800 shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-700 text-white text-left text-sm leading-normal">
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Job Role</th>
              <th className="py-3 px-6">Department</th>
              <th className="py-3 px-6">Salary</th>
              <th className="py-3 px-6">Performance History</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id} className="border-b border-gray-600 hover:bg-gray-700">
                <td className="py-3 px-6 text-white">{employee.name}</td>
                <td className="py-3 px-6 text-white">{employee.jobRole}</td>
                <td className="py-3 px-6 text-white">{employee.department}</td>
                <td className="py-3 px-6 text-white">{employee.salary}</td>
                <td className="py-3 px-6 text-white">{employee.performanceHistory.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
