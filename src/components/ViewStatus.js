import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, {Toaster} from 'react-hot-toast';
import { useUserContext } from './UserContext';

export default function ViewStatus() {
  const {userData} = useUserContext();
  const [ticketNum, setTicketNum] = useState('');
  const [ticketData, setTicketData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [view,setView]=useState(false);
  const filteredTicketData = ticketData.filter(ticket => ticket.status !== "Cancelled");


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

  const handleClick = (ticketNum)=>{
    const status="Cancelled";
    axios.post('http://localhost:5000/api/delete', {ticketNum,status})
    .then(response => {
      console.log("ticket click executed in resolve");
      const updatedTicket = response.data.data;
        setTicketData((prevTicketData) =>
          prevTicketData.map((ticket) =>
            ticket.ticketNum === updatedTicket.ticketNum ? updatedTicket : ticket
          )
          
        );
        setView(true);
    })
    .catch(error => {
      console.log("Error in executing delete button in viewstatus");
    })
  };

  return (
    <div className=" h-[500px] mt-[40px]">
    <Toaster/>
    {ticketData &&
        <div className="flex flex-col mx-[10%]">
          <div className="">
            <div className="p-1.5 w-full inline-block align-middle ">
              <div className=" overflow-x-scroll lg:overflow-hidden border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 ">
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
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        Ticket gen Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        Ticket gen Time
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        Edit/Discard
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                  {filteredTicketData.map(ticket => (
                    <tr key={ticket.ticketNum}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">{ticket.ticketNum}</td>
                      <td  className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{ticket.empId}</td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{ticket.reqBy}</td>
                      <td className={`px-6 py-4 text-sm text-gray-800 whitespace-nowrap ${
                          ticket.status === 'Pending' ? 'font-bold font-serif text-red-400': ticket.status==='Done'?'font-bold font-serif text-green-500' : 'font-serif font-bold text-amber-500'
                        }`}>{ticket.status}</td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap"> {formatDate(ticket.dateTimeTicket)}</td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap"> {formatTime(ticket.dateTimeTicket)}</td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        <div className='flex items-center'>
                          <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 hover:bg-slate-200 hover:rounded">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"/>
                          </svg>
                            <div className='mx-[5%] text-xl' >
                            / 
                            </div>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 hover:bg-slate-200 hover:rounded" onClick={()=>handleClick(ticket.ticketNum)} >
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        </div>
                      </td>
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
  );
}