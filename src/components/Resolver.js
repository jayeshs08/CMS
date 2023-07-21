import React, {createContext, useState, setState, useContext, useEffect} from 'react';
import axios from 'axios'
import { useUserContext } from './UserContext';

export default function Resolver()
{
  const {userData} = useUserContext();

  const [ticketData, setTicketData] = useState(null);
  const [resData, setResData] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(()=>{
  //   console.log("userdata resolver:");
  //   console.log(userData);

  //   const resId=userData[0].resId;

  //   if(userData && userData[0].resId){
  //   setLoading(true);

  // axios.post('http://localhost:5000/api/resolver', { resId })
  //   .then(response => {
  //     // Set the fetched data in resData state
  //     console.log("resolver sent request");
  //     setResData(response.data.data);
  //     setLoading(false);
  //   })
  //   .catch(error => {
  //     console.log("Error in fetching data from resolver API");
  //     setLoading(false);
  //   });
  // }

  // },[userData])
  
  useEffect(() => {
    console.log("userdata resolver:");
    console.log(userData);

    if (userData && userData.length > 0 && userData[0].resId) {
      setLoading(true);

      axios.post('http://localhost:5000/api/resolver', { resId: userData[0].resId })
        .then(response => {
          // Set the fetched data in resData state
          console.log("resolver sent request");
          setResData(response.data.data);
          console.log(resData);
          setLoading(false);
        })
        .catch(error => {
          console.log("Error in fetching data from resolver API");
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [userData]);

  const handleTicketClick = (ticketNum)=>{
    axios.post('http://localhost:5000/api/resolvedata', {ticketNum})
    .then(response => {
      console.log("ticket click executed in resolve");
      setTicketData(response.data.data);
    })
    .catch(error => {
      console.log("Error in executing view button in resolver");
    })

  };

  return(
    <div className='resolver h-[350px]'>
          {loading ? (<div>LOADING . . . . </div>):
            resData &&
    <div className="flex flex-col mt-[5%] mx-[10%]">
      <div className="overflow-x-auto">
        <div className="p-1.5 w-full inline-block align-middle">
          <div className="overflow-x-scroll lg:overflow-hidden border rounded-lg">
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
                    Ticket status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                  >
                        VIEW
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
              {resData.map(ticket => (
                <tr key={ticket.ticketNum}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">{ticket.ticketNum}</td>
                  {/* <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{ticket.status}</td> */}
                  <td className={`px-6 py-4 text-sm text-gray-800 whitespace-nowrap ${
                    ticket.status === 'Pending' ? 'font-bold font-serif text-red-400  ' : 'font-serif font-bold text-green-500'
                    }`}>{ticket.status}</td>
                    <button className='flex items-center text-cyan-700 rounded hover:bg-slate-200' onClick={() => handleTicketClick(ticket.ticketNum)}>View
                    </button>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
}


{ticketData &&
    <div className="flex flex-col mt-[5%] mx-[10%]">
      <div className="overflow-x-auto">
        <div className="p-1.5 w-full inline-block align-middle">
          <div className="overflow-x-scroll lg:overflow-hidden border rounded-lg">
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
                    Employee ID Requester
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                  >
                    Requester Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                  >
                    Request Category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                  >
                    Request Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                  >
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
              {ticketData.map(ticket => (
                <tr key={ticket.ticketNum}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">{ticket.ticketNum}</td>
                  <td  className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{ticket.empId}</td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{ticket.reqBy}</td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{ticket.reqCategory}</td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{ticket.reqType}</td>
                  <td className={`px-6 py-4 text-sm text-gray-800 whitespace-nowrap ${
                    ticket.status === 'Pending' ? 'font-bold font-serif text-red-400  ' : 'font-serif font-bold text-green-500'
                    }`}>{ticket.status}</td>
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{ticket.description}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
}
    </div>
  )
}