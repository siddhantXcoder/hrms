"use client"; // Only if you are using Next.js with client components
import React, { useEffect, useState } from 'react';

interface Employee {
  _id: string;
  name: string;
}

interface Payroll {
  _id: string;
  employeeId: Employee;
  salary: number;
  deductions: number;
  payDate: string;
}

const SalarySlip = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>('');
  const [payrollData, setPayrollData] = useState<Payroll | null>(null);

  // Fetch employees for selection
  const fetchEmployees = async () => {
    try {
      const response = await fetch('/api/employees'); // Adjust API route if necessary
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Failed to fetch employees:', error);
    }
  };

  // Fetch payroll data based on selected employee
  const fetchPayrollData = async (employeeId: string) => {
    try {
      const response = await fetch(`/api/payroll?employeeId=${employeeId}`);
      const data = await response.json();
      setPayrollData(data);
    } catch (error) {
      console.error('Failed to fetch payroll data:', error);
    }
  };

  // Handle employee selection change
  const handleEmployeeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const employeeId = e.target.value;
    setSelectedEmployeeId(employeeId);
    fetchPayrollData(employeeId);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Salary Slip</h1>
        
        <div className="mb-4">
          <label className="block mb-2">Select Employee</label>
          <select
            value={selectedEmployeeId}
            onChange={handleEmployeeChange}
            className="border border-gray-300 p-2 w-full bg-gray-800"
          >
            <option value="" disabled>Select an employee</option>
            {employees.map(employee => (
              <option key={employee._id} value={employee._id}>{employee.name}</option>
            ))}
          </select>
        </div>

        {payrollData && (
          <div className="border border-gray-700 p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-2">Salary Slip Details</h2>
            <p><strong>Employee Name:</strong> {payrollData.employeeId.name}</p>
            <p><strong>Salary:</strong> ${payrollData.salary.toFixed(2)}</p>
            <p><strong>Deductions:</strong> ${payrollData.deductions.toFixed(2)}</p>
            <p><strong>Net Pay:</strong> ${(payrollData.salary - payrollData.deductions).toFixed(2)}</p>
            <p><strong>Pay Date:</strong> {new Date(payrollData.payDate).toLocaleDateString()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalarySlip;
