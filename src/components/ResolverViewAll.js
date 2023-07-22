import React, {createContext, useState, setState, useContext, useEffect} from 'react';
import axios from 'axios'
import { useUserContext } from './UserContext';

export default function ResolverViewAll()
{
  const {userData} = useUserContext();

  const [ticketData, setTicketData] = useState(null);
  const [resData, setResData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewClicked, setViewClicked] = useState(false);

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

      axios.post('http://localhost:5000/api/resolverviewall', { resId: userData[0].resId })
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

    
  }, [userData,ticketData]);

  const handleTicketClick = (ticketNum)=>{
    axios.post('http://localhost:5000/api/resolvedata', {ticketNum})
    .then(response => {
      console.log("ticket click executed in resolve");
      setTicketData(response.data.data);
      setViewClicked(true);
    })
    .catch(error => {
      console.log("Error in executing view button in resolver");
    })
  };
  const handleClickComplete = (ticketNum) => {
    console.log(ticketNum);
    setViewClicked(false);
  };
  
  return(
    <div className='resolverviewall h-[650px]'>
          {(loading) ? (
          <div >LOADING . . . . </div>
          ):
            resData.length===0 ?<p className='mt-[5%] mx-[10%]'>You have no active tickets to resolve. </p> :( 
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
                          ticket.status === 'Pending' ? 'font-bold font-serif text-red-400': ticket.status==='Done'?'font-bold font-serif text-green-500' : 'font-serif font-bold text-amber-500'
                        }`}>{ticket.status}</td>
                    <button className='px-6 py-4 text-sm font-medium text-cyan-700 rounded hover:bg-slate-200' onClick={() => handleTicketClick(ticket.ticketNum)}>View
                    </button>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>)
}

 
{viewClicked && !loading && ticketData !== null ? (
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
                </tr>
              ))}
              </tbody>
            </table>
          </div>

        <div className="overflow-x-scroll lg:overflow-hidden border rounded-lg mt-[30px]">
          <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    Description
                  </th>
                  
                </tr>
              </thead>
              
              <tbody className="divide-y divide-gray-200">
              {ticketData.map(ticket => (
                <tr key={ticket.ticketNum}>
                 <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{ticket.description}</td>
                </tr>
              ))}
              </tbody>
           </table>
        </div>   

        <div className="mt-6 flex items-center justify-end gap-x-6">
        {/* {ticketData.map(ticket =>(
        <button key={ticket.ticketNum}
          type="submit"
          className="rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={()=>handleClickComplete(ticket.ticketNum)}
        >
          Save
        </button>
        ))} */}
         {ticketData.map((ticket) => (
              <button
                key={ticket.ticketNum}
                type="submit"
                className="rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => handleClickComplete(ticket.ticketNum)}
              >
                Close
              </button>
            ))}
      </div>
        </div>
      </div>
    </div>
):(
  <div></div>
)}  


    </div>
  )
}