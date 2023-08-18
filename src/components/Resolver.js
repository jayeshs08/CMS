import React, {createContext, useState, setState, useContext, useEffect} from 'react';
import axios from 'axios'
import { useUserContext } from './UserContext';
import ResolverDoneModal from './ResolverDoneModal'
import Escalate from './Escalate';
export default function Resolver()
{
  const {userData} = useUserContext();
  const [ticketData, setTicketData] = useState([]);
  const [resData, setResData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewClicked, setViewClicked] = useState(false);
  const[temp,setTemp]=useState([]);
  const[viewCancel,setViewCancel]=useState(false);
  const[viewEscalate,setViewEscalate]=useState(false);

  
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
  }, [userData,ticketData]);

  const handleTicketClick = (ticket)=>{
    console.log('clicked');
    setViewClicked(true);
    setTemp(ticket);
  };

  const handleTicketCancel=(ticket)=>{
    console.log('clicked');
    setViewCancel(true);
    setTemp(ticket);
  }

  const handleClose=(ticketNum)=>{
    const status="Done"
    axios
      .post('http://localhost:5000/api/updateStatus', { ticketNum,status})
      .then((response) => {
        console.log('ticket click executed in resolve');
  
        const updatedTicket = response.data.data;
        setTicketData((prevTicketData) =>
          prevTicketData.map((ticket) =>
            ticket.ticketNum === updatedTicket.ticketNum ? updatedTicket : ticket
          )
        );
        setViewClicked(false);
      })
      .catch((error) => {
        console.log('Error in executing view button in resolver');
      });

      axios
      .post('http://localhost:5000/api/updateStatusIssue', { ticketNum,status})
      .then((response) => {
        console.log('ticket click executed in resolve');
  
        const updatedTicket = response.data.data;
        setTicketData((prevTicketData) =>
          prevTicketData.map((ticket) =>
            ticket.ticketNum === updatedTicket.ticketNum ? updatedTicket : ticket
          )
        );
        setViewClicked(false);
      })
      .catch((error) => {
        console.log('Error in executing view button in resolver');
      });
  }

  const handleCancel=(ticketNum)=>{
  const status="Cancelled"
    axios
      .post('http://localhost:5000/api/updateStatus', { ticketNum,status})
      .then((response) => {
        console.log('ticket click executed in resolve');
  
        const updatedTicket = response.data.data;
        setTicketData((prevTicketData) =>
          prevTicketData.map((ticket) =>
            ticket.ticketNum === updatedTicket.ticketNum ? updatedTicket : ticket
          )
        );
        setViewClicked(false);
      })
      .catch((error) => {
        console.log('Error in executing view button in resolver');
      });
  }

  const handleCloseClick=()=>{
    setViewClicked(false);
    setViewCancel(false);
  }
  
  const handleEscalate=(ticket)=>{
    console.log("clicked escalte");
    setViewEscalate(true);
    setViewCancel(false);
  }

  
  return(
    <div className='resolver h-[650px]'>
          {(loading) ? (
          <div >LOADING . . . . </div>
          ):
            resData?.length===0 ?<p className='mt-[5%] mx-[10%]'>You have no active tickets to resolve. </p> :( 
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
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    Req By
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                     Email
                  </th>
                 
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    Subject
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                  >
                    View Ticket
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                  >
                    Escalate
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
              {resData.map(ticket => (
                <tr key={ticket.ticketNum}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">{ticket.ticketNum}</td>
                  <td className={`px-6 py-4 text-sm text-gray-800 whitespace-nowrap ${
                  ticket.status === 'Pending' ? 'font-bold font-serif text-red-400' : 
                  ticket.status === 'Active' ? 'font-bold font-serif text-amber-500' :
                  ticket.status === 'Done' ? 'font-bold font-serif text-green-500' :  
                  'font-bold font-serif'                  
                }`}>{ticket.status}</td>


                  <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">{ticket.reqBy}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">{ticket.emailId}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">{ticket.subject}</td>
                  <td className="px-[3%] py-4 text-sm font-medium text-gray-800 whitespace-nowrap" ><button onClick={() => handleTicketClick(ticket)} className='hover:text-indigo-400 px-2 py-2'> View</button></td>
                 
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                    <div className='flex items-center justify-start mx-4 hover:text-indigo-400 '><button onClick={()=>handleEscalate()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                    </button>
                    </div>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>)
}
    
{resData && resData.length > 0 ? (
  <div className="flex flex-col mt-[5%] mx-[10%]">
   {resData.map(ticket=>(
      <tr key={ticket.ticketNum}>
        {viewClicked && ticket.ticketNum===temp.ticketNum  && <ResolverDoneModal dataProp={ticket} onClose={()=>handleClose(ticket.ticketNum)} onCancel={()=>handleCancel(ticket.ticketNum)} onCloseClick={()=>handleCloseClick()}/>}
        
        {viewEscalate && ticket.ticketNum===temp.ticketNum  && <Escalate dataProp={ticket} resName={userData[0].resName} resId={userData[0].resId} onClose={()=>handleCloseClick(ticket.ticketNum)}  />}
      </tr>))
    }
  </div>
) : (
  <p className="mt-[5%] mx-[10%]"> </p>
)}



    </div>
  )
}