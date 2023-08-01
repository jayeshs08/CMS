import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Escalate() {
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [employeesByLevel, setEmployeesByLevel] = useState([]);

  const handleLevelChange = (e) => {
    const selectedLevel = e.target.value;
    setSelectedLevel(selectedLevel);

    // When the level changes, reset the selected employee
    setSelectedEmployee('');
  };

  const handleEmployeeChange = (e) => {
    setSelectedEmployee(e.target.value);
  };

  useEffect(() => {
    // Fetch employees for the selected level
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/options`, { params: { level: selectedLevel } });
        setEmployeesByLevel(response.data.options);
      } catch (error) {
        console.error('Error fetching second dropdown options:', error);
        setEmployeesByLevel([]);
      }
    };

    if (selectedLevel !== '') {
      fetchEmployees();
    }
  }, [selectedLevel]);

  return (
    <div className="lg:mx-[200px] lg:pt-[50px] md:mx-[60px] md:mt-[50px] md:mb-[50px] border border-gray-800 rounded px-[50px] py-[50px]">
      <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
        <h1 className="font-bold text-center mt-[2%] mx-[11%] text-3xl text-gray-800">
          ESCALATE
        </h1>
        <label className="text-md text-gray-800">
          SELECT LEVEL:
          <select
            value={selectedLevel}
            onChange={handleLevelChange}
            className="block border border-gray-800 rounded px-4 py-2 mt-2 focus:outline-none focus:border-purple-500"
          >
            <option value="">Select</option>
            <option>Level 1</option>
            <option>Level 2</option>
            <option>Level 3</option>
          </select>
        </label>

        {selectedLevel && (
          <label className=" text-md text-gray-800">
            SELECT EMPLOYEE
            <select
              value={selectedEmployee}
              onChange={handleEmployeeChange}
              className="block border border-gray-800 rounded px-4 py-2 mt-2 focus:outline-none focus:border-purple-500"
            >
              <option value="">Select</option>
              {employeesByLevel.map((employee) => (
                <option key={employee} value={employee}>
                  {employee}
                </option>
              ))}
            </select>
          </label>
        )}

        <div className="text-left">
          <p className="mt-8 mb-3 text-md text-gray-800">TICKET NUMBER:</p>
          <input
            type="text"
            className="mb-2 mt-2 px-4 py-2 block border border-gray-800 focus:outline-none focus:border-purple-500"
          />
        </div>
        <div className="text-left">
          <p className="mt-8 mb-3 text-md text-gray-800">REASON:</p>
          <input
            type="text"
            className="mb-2 mt-2 px-4 py-2 block border border-gray-800 focus:outline-none focus:border-purple-500" 
          />
        </div>

        <div className="mt-6 flex items-center justify-center gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            SEND REQUEST
          </button>
        </div>
      </form>
    </div>
  );
}
