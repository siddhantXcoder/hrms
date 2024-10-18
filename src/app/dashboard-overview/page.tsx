"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define types for Employee, Payroll, and Leave
interface Employee {
  _id: string;
  name: string;
  contactDetails: string;
  jobRole: string;
  department: string;
  salary: number;
}

interface Payroll {
  _id: string;
  employeeId: string;
  amount: number;
  payDate: Date;
}

interface Leave {
  _id: string;
  employeeId: string;
  startDate: Date;
  endDate: Date;
  reason: string;
}

const Overview: React.FC = () => {
  const [employeeCount, setEmployeeCount] = useState<number>(0);
  const [totalSalary, setTotalSalary] = useState<number>(0);
  const [totalLeaves, setTotalLeaves] = useState<number>(0);
  const [payrollData, setPayrollData] = useState<Payroll[]>([]);
  const [leaveData, setLeaveData] = useState<Leave[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total employees
        const employeeResponse = await axios.get<Employee[]>('http://localhost:3000/api/employees');
        setEmployeeCount(employeeResponse.data.length);

        // Fetch payroll data
        const payrollResponse = await axios.get<Payroll[]>('http://localhost:3000/api/payroll');
        setPayrollData(payrollResponse.data);
        
        // Calculate total salary from payroll data
        const total = payrollResponse.data.reduce((acc, payroll) => acc + payroll.amount, 0);
        setTotalSalary(total);

        // Fetch leave data
        const leaveResponse = await axios.get<Leave[]>('http://localhost:3000/api/leaves'); // Update this if you have a different endpoint
        setLeaveData(leaveResponse.data);
        
        // Calculate total leaves taken
        setTotalLeaves(leaveResponse.data.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Overview</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">Total Employees</h2>
            <p className="text-gray-300 text-3xl">{employeeCount}</p>
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">Total Salary Paid</h2>
            <p className="text-gray-300 text-3xl">${totalSalary.toLocaleString()}</p>
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">Total Leaves Taken</h2>
            <p className="text-gray-300 text-3xl">{totalLeaves}</p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Recent Payroll Records</h2>
          <table className="min-w-full bg-gray-800 border border-gray-600 mt-2 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-700">
                <th className="border-b py-2 px-4 text-left text-gray-200">Employee ID</th>
                <th className="border-b py-2 px-4 text-left text-gray-200">Pay Date</th>
                <th className="border-b py-2 px-4 text-left text-gray-200">Amount</th>
              </tr>
            </thead>
            <tbody>
              {payrollData.slice(0, 5).map((payroll) => (
                <tr key={payroll._id} className="hover:bg-gray-700">
                  <td className="border-b py-2 px-4 text-gray-300">{payroll.employeeId}</td>
                  <td className="border-b py-2 px-4 text-gray-300">{new Date(payroll.payDate).toLocaleDateString()}</td>
                  <td className="border-b py-2 px-4 text-gray-300">${payroll.amount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Recent Leave Records</h2>
          <table className="min-w-full bg-gray-800 border border-gray-600 mt-2 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-700">
                <th className="border-b py-2 px-4 text-left text-gray-200">Employee ID</th>
                <th className="border-b py-2 px-4 text-left text-gray-200">Start Date</th>
                <th className="border-b py-2 px-4 text-left text-gray-200">End Date</th>
                <th className="border-b py-2 px-4 text-left text-gray-200">Reason</th>
              </tr>
            </thead>
            <tbody>
              {leaveData.slice(0, 5).map((leave) => (
                <tr key={leave._id} className="hover:bg-gray-700">
                  <td className="border-b py-2 px-4 text-gray-300">{leave.employeeId}</td>
                  <td className="border-b py-2 px-4 text-gray-300">{new Date(leave.startDate).toLocaleDateString()}</td>
                  <td className="border-b py-2 px-4 text-gray-300">{new Date(leave.endDate).toLocaleDateString()}</td>
                  <td className="border-b py-2 px-4 text-gray-300">{leave.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Overview;
