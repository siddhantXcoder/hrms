"use client"; // Only if using Next.js with client components
import React, { useEffect, useState } from 'react';

interface Employee {
  _id: string;
  name: string;
  contactDetails: string;
  jobRole: string;
  department: string;
  salary: number;
  performanceHistory: string[];
  documents: string[];
}

const Stats = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [averageSalary, setAverageSalary] = useState<number>(0);
  const [departmentStats, setDepartmentStats] = useState<{ [key: string]: number }>({});
  const [totalEmployees, setTotalEmployees] = useState<number>(0);

  // Fetch all employees
  const fetchEmployees = async () => {
    try {
      const response = await fetch('/api/employees');
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Failed to fetch employees:', error);
    }
  };

  // Calculate statistics based on fetched employees
  const calculateStats = (employeeList: Employee[]) => {
    setTotalEmployees(employeeList.length);

    const totalSalary = employeeList.reduce((acc, employee) => acc + employee.salary, 0);
    setAverageSalary(totalSalary / employeeList.length || 0);

    const departments: { [key: string]: number } = {};
    employeeList.forEach(employee => {
      departments[employee.department] = (departments[employee.department] || 0) + 1;
    });
    setDepartmentStats(departments);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (employees.length > 0) {
      calculateStats(employees);
    }
  }, [employees]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Employee Statistics</h1>
        
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Total Employees: {totalEmployees}</h2>
          <h2 className="text-xl font-semibold">Average Salary: ${averageSalary.toFixed(2)}</h2>
        </div>

        <div className="border border-gray-700 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Department Distribution</h2>
          <ul>
            {Object.entries(departmentStats).map(([department, count]) => (
              <li key={department}>
                {department}: {count}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Stats;
