import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';

function Admin() {
  const [ticketNum, setTicketNum] = useState('');
  const [ticketData, setTicketData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
  // Create an object with the form data
  const requestData = {
    ticketNum
  };

  // Send an HTTP POST request to the backend API endpoint
  axios
    .post('http://localhost:5000/api/members', requestData)
    .then(response => {
      console.log('Ticket status fetched successfully:', response.data);
      setTicketData(response.data.data); // Save the fetched data
      setError(null); // Clear any previous errors
    })
    .catch(error => {
      console.error('Error fetching ticket status:', error);
      setError('Error fetching ticket status');
      setTicketData(null); // Clear the ticket data
    });
  },[]);
  return (

    <div className='admin h-[350px]'>
          {ticketData &&
    <div className="flex flex-col mt-[5%] mx-[10%]">
      <div className="overflow-x-auto">
        <div className="p-1.5 w-full inline-block align-middle">
          <div className="overflow-hidden border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    Ticket Number
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    Employee ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    Employee Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    Ticket status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
              {ticketData.map(ticket => (
                <tr key={ticket.ticketNum}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">{ticket.ticketNum}</td>
                  <td  className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{ticket.empId}</td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{ticket.reqBy}</td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{ticket.status}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
}
{error && <p>{error}</p>}
    </div>
  )
}

export default Admin