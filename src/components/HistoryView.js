import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function HistoryView() {
  const location = useLocation();
  const [ticketDetails, setTicketDetails] = useState([]);
  const [error, setError] = useState(null);
  const [resolverId, setResolverId] = useState('');
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    const ticketNum = location.state?.ticketNum;
    console.log('ticketNum:', ticketNum);

    if (ticketNum) {
      // Fetch ticket details from the backend API based on ticketNum
      axios
        .get(`http://localhost:5000/api/tickethistory/${ticketNum}`)
        .then(response => {
          console.log('Ticket details fetched successfully:', response.data);
          setTicketDetails(response.data.data);
          console.log('ticketDetails:', ticketDetails);
          setError(null);
        })
        .catch(error => {
          console.error('Error fetching ticket details:', error);
          setError('No history found as it is not yet assigned.');
          setTicketDetails(null);
        });
    }
  }, [location]);



// Function to format the date
const formatDate = (dateTime) => {
  return new Date(dateTime).toLocaleDateString();
};
  

  const handleBackClick = () => {
   
   navigate('/viewstatus');
  };

  return (
    <div className='historyview h-[420px]'>
    {isModalOpen && (
    <div className='fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center'>
      <div className='bg-white p-6 rounded-lg max-w w-[70%] '>
      <h1 className='font-bold text-left mt-[2%] mx-[11%]'>TICKET HISTORY</h1>
      {ticketDetails ? (
        <div>
          <div className="flex flex-col mt-[1%] mx-[10%]">
            <div className="overflow-x-auto">
              <div className="p-1.5 w-full inline-block align-middle ">
                <div className=" border rounded-lg ">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                        >
                          Ticket No
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                        >
                          Assigned To
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                        >
                          Assigned On
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                        >
                          Assigned Till
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                        >
                          Status/Action
                        </th>
                      </tr>
                    </thead>
                    {/* <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                          {ticketDetails.ticketNum}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{ticketDetails.assignTo}</td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{ticketDetails.assignByTime}</td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{ticketDetails.assignToTime}</td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{ticketDetails.action}</td>
                      </tr>
                    </tbody> */}

                    <tbody className="divide-y divide-gray-200">
                     {ticketDetails.map(ticket => (
                      <tr key={ticket.ticketNum}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">{ticket.ticketNum}</td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{ticket.assignTo}</td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{formatDate(ticket.assignByTime)} </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{ticket.assignToTime===null?<p>  </p>:<p>{formatDate(ticket.assignToTime)}</p>}</td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{ticket.action}</td>
                        
                      </tr>
                      ))}
                    </tbody>

                  </table>
                </div>
              </div>
            </div>
             <div className="mt-6 flex items-center justify-end gap-x-6">
        
        <button
        type="button"
        className="rounded-md bg-gray-300 px-3 py-2 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={handleBackClick}
        >
          Back
        </button>
      </div>
          </div>
        </div>
      ) : (
        <p>{error || 'Loading ticket details...'}</p>
      )}
      </div>
    </div>
    )} 
    </div>
  );
}

export default HistoryView;