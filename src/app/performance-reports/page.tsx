"use client";
import React, { useState } from 'react';

// Sample data for demonstration purposes
const sampleEmployeeData = [
  { id: 1, name: "John Doe", department: "Engineering", salary: 60000, leaves: 5 },
  { id: 2, name: "Jane Smith", department: "Marketing", salary: 55000, leaves: 3 },
];

const samplePayrollData = [
  { id: 1, employeeId: 1, payDate: "2024-01-01", amount: 5000 },
  { id: 2, employeeId: 2, payDate: "2024-01-01", amount: 4500 },
];

const sampleLeaveData = [
  { id: 1, employeeId: 1, startDate: "2024-02-01", endDate: "2024-02-05", reason: "Vacation" },
  { id: 2, employeeId: 2, startDate: "2024-02-10", endDate: "2024-02-12", reason: "Sick Leave" },
];

const Reports = () => {
  const [activeTab, setActiveTab] = useState<string>('employee');

  // Fetch data for different reports
  const fetchEmployeeReports = () => sampleEmployeeData;
  const fetchPayrollReports = () => samplePayrollData;
  const fetchLeaveReports = () => sampleLeaveData;

  const renderReports = () => {
    switch (activeTab) {
      case 'employee':
        const employees = fetchEmployeeReports();
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Employee Reports</h2>
            <table className="min-w-full bg-gray-800 border border-gray-600 mt-2 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-700">
                  <th className="border-b py-2 px-4 text-left text-gray-200">Name</th>
                  <th className="border-b py-2 px-4 text-left text-gray-200">Department</th>
                  <th className="border-b py-2 px-4 text-left text-gray-200">Salary</th>
                  <th className="border-b py-2 px-4 text-left text-gray-200">Leaves Taken</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-700">
                    <td className="border-b py-2 px-4 text-gray-300">{employee.name}</td>
                    <td className="border-b py-2 px-4 text-gray-300">{employee.department}</td>
                    <td className="border-b py-2 px-4 text-gray-300">${employee.salary}</td>
                    <td className="border-b py-2 px-4 text-gray-300">{employee.leaves}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'payroll':
        const payrolls = fetchPayrollReports();
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Payroll Reports</h2>
            <table className="min-w-full bg-gray-800 border border-gray-600 mt-2 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-700">
                  <th className="border-b py-2 px-4 text-left text-gray-200">Employee ID</th>
                  <th className="border-b py-2 px-4 text-left text-gray-200">Pay Date</th>
                  <th className="border-b py-2 px-4 text-left text-gray-200">Amount</th>
                </tr>
              </thead>
              <tbody>
                {payrolls.map((payroll) => (
                  <tr key={payroll.id} className="hover:bg-gray-700">
                    <td className="border-b py-2 px-4 text-gray-300">{payroll.employeeId}</td>
                    <td className="border-b py-2 px-4 text-gray-300">{new Date(payroll.payDate).toLocaleDateString()}</td>
                    <td className="border-b py-2 px-4 text-gray-300">${payroll.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'leave':
        const leaves = fetchLeaveReports();
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Leave Reports</h2>
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
                {leaves.map((leave) => (
                  <tr key={leave.id} className="hover:bg-gray-700">
                    <td className="border-b py-2 px-4 text-gray-300">{leave.employeeId}</td>
                    <td className="border-b py-2 px-4 text-gray-300">{new Date(leave.startDate).toLocaleDateString()}</td>
                    <td className="border-b py-2 px-4 text-gray-300">{new Date(leave.endDate).toLocaleDateString()}</td>
                    <td className="border-b py-2 px-4 text-gray-300">{leave.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Reports</h1>
        <div className="mb-4 flex flex-col md:flex-row md:justify-start">
          <button
            className={`mr-0 mb-2 md:mb-0 md:mr-4 p-2 rounded transition-colors duration-300 ${activeTab === 'employee' ? 'bg-blue-500' : 'bg-gray-700 hover:bg-gray-600'}`}
            onClick={() => setActiveTab('employee')}
          >
            Employee Reports
          </button>
          <button
            className={`mr-0 mb-2 md:mb-0 md:mr-4 p-2 rounded transition-colors duration-300 ${activeTab === 'payroll' ? 'bg-blue-500' : 'bg-gray-700 hover:bg-gray-600'}`}
            onClick={() => setActiveTab('payroll')}
          >
            Payroll Reports
          </button>
          <button
            className={`p-2 rounded transition-colors duration-300 ${activeTab === 'leave' ? 'bg-blue-500' : 'bg-gray-700 hover:bg-gray-600'}`}
            onClick={() => setActiveTab('leave')}
          >
            Leave Reports
          </button>
        </div>

        {renderReports()}
      </div>
    </div>
  );
};

export default Reports;
