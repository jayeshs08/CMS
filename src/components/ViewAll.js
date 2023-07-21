import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from './Pagination';
import pagination from './Pagination.css';


function ViewAll() {
  const [ticketData, setTicketData] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5; // Number of items to display per page

  useEffect(() => {
    // Fetch data from the server when the component mounts
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .post('http://localhost:5000/api/members')
      .then(response => {
        console.log('Ticket status fetched successfully:', response.data);
        setTicketData(response.data.data); // Save the fetched data
        setError(null); // Clear any previous errors
      })
      .catch(error => {
        console.error('Error fetching ticket status:', error);
        setError('Error fetching ticket status');
        setTicketData([]); // Clear the ticket data in case of an error
      });
  };

  // Calculate the number of pages based on the total items and itemsPerPage
  const pageCount = Math.ceil(ticketData.length / itemsPerPage);

  // Helper function to get the current page's data
  const getCurrentPageData = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return ticketData.slice(startIndex, endIndex);
  };

  // Function to handle page change when the user clicks on a page number
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className='viewall '>
    <div className='h-[400px]' >
      {ticketData.length > 0 ? (
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
                    {getCurrentPageData().map(ticket => (
                      <tr key={ticket.ticketNum}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">{ticket.ticketNum}</td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{ticket.empId}</td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{ticket.reqBy}</td>
                        <td className={`px-6 py-4 text-sm text-gray-800 whitespace-nowrap ${
                          ticket.status === 'Pending' ? 'font-bold font-serif text-red-400' : 'font-serif font-bold text-green-500'
                        }`}>{ticket.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>No ticket data found.</p>
      )}
      
      {error && <p>{error}</p>}

      
      </div>

    <div className='mb-[20px]' >
    {/* Render the pagination component */}
    {ticketData.length > 0 && (
      <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
    )}  
    </div>

    </div>
  );
}

export default ViewAll;