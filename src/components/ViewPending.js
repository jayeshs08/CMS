import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from './Pagination'; // Import the Pagination component

function ViewPending() {
  const navigate = useNavigate(); // React Router's navigate function
  const [ticketNum, setTicketNum] = useState('');
  const [ticketData, setTicketData] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5; // Number of items to display per page

  useEffect(() => {
    // Fetch data from the server when the component mounts
    fetchData();
  }, [currentPage]); // Call fetchData whenever the currentPage changes

  const fetchData = () => {
    // Create an object with the form data
    const requestData = {
      ticketNum,
    };

    // Send an HTTP POST request to the backend API endpoint
    axios
      .post('http://localhost:5000/api/pending', requestData)
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
  };

  // Calculate the number of pages based on the total items and itemsPerPage
  const pageCount = Math.ceil(ticketData?.length / itemsPerPage);

  // Helper function to get the current page's data
  const getCurrentPageData = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return ticketData?.slice(startIndex, endIndex);
  };

  // Function to handle page change when the user clicks on a page number
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleTicketClick = ticketId => {
    // Find the selected ticket based on ticketId
    const selectedTicket = ticketData?.find(ticket => ticket.ticketNum === ticketId);
    // Pass the selected ticket to the next page using state
    console.log(selectedTicket?.ticketNum);
    navigate('/issuedescription', { state: { ticketNum: selectedTicket?.ticketNum } });
  };

  return (
    <div className='viewall '>
    <div className="viewpending h-[400px]">
      {ticketData && ticketData.length===0 ?<p className='mt-[5%] mx-[10%]'>No Pending tickets to be alloted. </p>:(
        <div className="flex flex-col mt-[5%] mx-[10%]">
          <div className="overflow-x-auto">
            <div className="p-1.5 w-full inline-block align-middle">
              <div className="overflow-hidden border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                      >
                        Ticket Number
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                      >
                        Requested By
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                      >
                        Subject
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                      >
                        Ticket status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                      >
                        Update
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {getCurrentPageData()?.map(ticket => (
                      <tr key={ticket.ticketNum}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                          {ticket.ticketNum}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{ticket.reqBy}</td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{ticket.subject}</td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{ticket.status}</td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap ">
                          <button className='flex items-center text-cyan-700 rounded hover:bg-slate-200' onClick={() => handleTicketClick(ticket.ticketNum)}>Update
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" w-4 h-4 pl-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                          </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>

      {/* Render the pagination component */}
      {ticketData && ticketData.length===0 ? <p></p> : (
        <div className="pagination-container mb-[20px]">
          <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
        </div>
      )}
    </div>
  );
}

export default ViewPending;