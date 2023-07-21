import React, { useState } from 'react';
import axios from 'axios';
import toast, {Toaster} from 'react-hot-toast';

export default function ViewStatus() {
  const [ticketNum, setTicketNum] = useState('');
  const [ticketData, setTicketData] = useState(null);
  const [error, setError] = useState(null);

  const handleticketnum = (e) => {
    setTicketNum(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!ticketNum || ticketNum === "")
    toast.error("Kindly enter ticket number");
    else{
    // Create an object with the form data
    const requestData = {
      ticketNum
    };

    // Send an HTTP POST request to the backend API endpoint
    axios
      .post('http://localhost:5000/api/fetch', requestData)
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
    }
  };

  return (
    <div className=" h-[500px]">
    <Toaster/>
      <form className="lg:mx-[200px] lg:pt-[50px] md:mx-[60px] md:mt-[0px]" onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Enter your Ticket Number
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="ticketnum"
                      id="ticketnum"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1  placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="enter ticket number"
                      value={ticketNum}
                      onChange={handleticketnum}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="submit"
                className="rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Show status
              </button>
            </div>
            </div>
          </div>
        </div>
      </form>

    {ticketData &&
    <div className="flex flex-col mx-[10%]">
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
  );
}