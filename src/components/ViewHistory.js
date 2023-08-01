import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, {Toaster} from 'react-hot-toast';
import { useUserContext } from './UserContext';
import Pagination from './Pagination';
import pagination from './Pagination.css';

export default function ViewHistory() {
  const {userData} = useUserContext();
  const [ticketNum, setTicketNum] = useState('');
  const [ticketData, setTicketData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [view,setView]=useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5; // Number of items to display per page



  useEffect(() => {
    console.log("userdata resolver:");
    console.log(userData);
    if (userData && userData.length > 0 && userData[0].userEmail) {
      setLoading(true);
      axios
      .post('http://localhost:5000/api/fetch', { userId: userData[0].userEmail })
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
   
  }},[view]);


  // Function to format the date
  const formatDate = (dateTime) => {
    return new Date(dateTime).toLocaleDateString();
  };

  // Function to format the time
  const formatTime = (dateTime) => {
    return new Date(dateTime).toLocaleTimeString();
  }

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
    <div className="viewhistory h-[500px] mt-[40px]">
    <Toaster/>
    {ticketData && ticketData.length===0 ?<p className='mt-[5%] mx-[10%]'>No Current tickets to be resolved. </p>:(
        <div className="flex flex-col mx-[10%]">
          <div className="">
            <div className="p-1.5 w-full inline-block align-middle ">
              <div className=" overflow-x-scroll lg:overflow-hidden border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 ">
                  <thead className="bg-gray-50 ">
                    <tr className=''>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-center  text-gray-500 uppercase "
                      >
                        Ticket Number
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                      >
                        Ticket status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                      >
                        Ticket gen Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                      >
                        Ticket gen Time
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                      >
                        Resolved/Cancelled Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                      >
                        Resolved/Cancelled Time
                      </th>
                      
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                  {getCurrentPageData().map(ticket => (
                    <tr key={ticket.ticketNum}>
                      <td className="px-6 py-4 text-sm text-center font-medium text-gray-800 whitespace-nowrap">{ticket.ticketNum}</td>
                     <td className={`px-6 py-4 text-sm text-center text-gray-800 whitespace-nowrap ${
                          ticket.status === 'Pending' ? 'font-bold font-serif text-red-400': ticket.status==='Done'?'font-bold font-serif text-green-500' : 'font-serif font-bold text-amber-300'
                        }`}>{ticket.status}</td>
                      <td className="px-6 py-4 text-sm text-center text-gray-800 whitespace-nowrap"> {formatDate(ticket.dateTimeTicket)}</td>
                      <td className="px-6 py-4 text-sm text-center text-gray-800 whitespace-nowrap"> {formatTime(ticket.dateTimeTicket)}</td>
                      <td className="px-6 py-4 text-sm text-center text-gray-800 whitespace-nowrap"> {formatDate(ticket.resolvedTime)}</td>
                      <td className="px-6 py-4 text-sm text-center text-gray-800 whitespace-nowrap"> {formatTime(ticket.resolvedTime)}</td>
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
      <div className='mb-[20px]' >
    {/* Render the pagination component */}
    {ticketData.length > 0 && (
      <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
    )}  
    </div>
    </div>
  );
}