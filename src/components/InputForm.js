import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, {Toaster} from 'react-hot-toast';
import { useUserContext } from './UserContext'; // Import the useUserContext hook
import { nanoid } from 'nanoid';
 

export default function InputForm() {
  const [userId,setUserId]=useState('');
  const [reqBy, setReqBy] = useState('');
  const [reqType, setReqType] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState('');
  const [reqCategory, setReqCategory] = useState('');
  const [ticketNum, setTicketNum] = useState('');
  const [emailId,setEmailId]=useState('');
  const [phoneNo,setPhoneNo]=useState('');
  const [status,setStatus]=useState('Pending');

  const { userData } = useUserContext(); // Access user data from the UserContext





  useEffect(() => {
    if (userData.length > 0) {
      setUserId(userData[0].userId);
      setReqBy(userData[0].userName);
      setEmailId(userData[0].userEmail);
      setPhoneNo(userData[0].userPhone);
    }
  }, [userData]);



  useEffect(() => {
    // Generate token number and current date & time
    const generatedticketnum = generateticketnum();
    

    // Set the generated values in the state
    setTicketNum(generatedticketnum);
  }, [SubmitEvent ]);
  
  const handleuserid=(e)=>{
    setUserId(e.target.value);

  }

  const handlereqbyChange = (e) => {
    setReqBy(e.target.value);
   
  };

  const handlereqtypeChange = (e) => {
    setReqType(e.target.value);

  };

  const handledescriptionchange = (e) => {
    setDescription(e.target.value);
  };

  const handlesubjectchange = (e)=>{
    setSubject(e.target.value);
  }

  const handlereqcategory = (e) => {
    setReqCategory(e.target.value);
  };
  const handleemailid=(e)=>{
    setEmailId(e.target.value);
  }

  const handlephoneno=(e)=>{
    setPhoneNo(e.target.value);
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if(userId===""|| !userId)
    {
      toast.error("Invalid Credentials");
    }

 else if(reqBy==="" || !reqBy)
    {
      toast.error("Invalid Credentials");
    }

  else if(reqType==="" || !reqType)
    {
      toast.error("Request type can't be left empty");
    }

  else if(description==="" || !description)
    {
      toast.error("Kindly fill description");
    }

  else  if(reqCategory==="" || !reqCategory)
    {
      toast.error("Category have to be chosen");
    }

   else if(emailId==="" || !emailId)
    {
      toast.error("Invalid Credentials");
    }

   else if(phoneNo==="" || !phoneNo)
    {
      toast.error("Invalid Phone number");
    }
    else if(subject ==="" || !subject)
    {
      toast.error("Please enter subject");
    }
    else {
    // Create an object with the form data
    const requestData = {
      ticketNum,
      userId,
      emailId,
      reqBy,
      reqType,
      description,
      reqCategory,
      phoneNo,
      status,
      subject
    };
  
    // Send an HTTP POST request to the backend API endpoint
    axios.post('http://localhost:5000/api/requests', requestData)
      .then(response => {
        console.log('Request submitted successfully:', response.data);
        // Perform any necessary actions upon successful submission

        setUserId('');
        setReqBy('');
        setReqType('');
        setDescription('');
        setReqCategory('');
        setEmailId('');
        setPhoneNo('');
        setSubject('');
        const generatedTicketNum = generateticketnum();
        setTicketNum(generatedTicketNum);
      })
      .catch(error => {
        console.error('Error submitting request:', error);
        // Handle the error appropriately
      });
    }
  };

  const generateticketnum = () => {
    // Generate a random alphanumeric string of length 6
    const randomString = nanoid(3).toUpperCase();
  
    // Combine the random string and a short timestamp (based on current time)
    const timestamp = Date.now().toString(36).toUpperCase().slice(-3);
  
    // Combine the random string and timestamp to create the ticket number
    const ticketNumber = randomString + timestamp;
    return ticketNumber;
  };

  return (
    <div className="">
    <Toaster/>
    <form className='lg:mx-[200px] lg:pt-[50px] md:mx-[60px] md:mt-[0px]' onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <p className="mt-1 text-lg leading-6 text-gray-600">
            Welcome to complaint registering page. 
          </p>
          <h1 className='mt-[30px] mb-[20px] font-bold text-gray-800'>Your ticket token is {ticketNum}</h1>
          
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Enter your Employee ID
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1  placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Employee id"
                    value={userId}
                    onChange={handleuserid} 
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                Enter your name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="last-name"
                  className="block w-full bg-transparent rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder='Username'
                  value={reqBy}
                  onChange={handlereqbyChange} 
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  
                  placeholder='Enter your email id'
                  className="block w-full bg-transparent rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleemailid}
                  value={emailId} 
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                Enter your Phone/Extension number
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="postal-code"
                  id="postal-code"
                  autoComplete="postal-code"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handlephoneno}
                  value={phoneNo} 
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
              REQUEST TYPE
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="block w-full bg-transparent rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  value={reqType}
                  onChange={handlereqtypeChange} 
                >
                  <option  disabled value="" hidden>select one</option>
                  <option>REQUEST</option>
                  <option>INCIDENT</option>
                  <option>OTHER</option>
                </select>
              </div>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
              Category
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="block w-full bg-transparent rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  value={reqCategory}
                  onChange={handlereqcategory} 
                >
                  <option disabled value="" hidden>select one</option>
                  <option>HARDWARE</option>
                  <option>SOFTWARE</option>
                  <option>NETWORK</option>
                  <option>TELECOM</option>
                </select>
              </div>
            </div>    
            <div className="sm:col-span-3">
              <label htmlFor="subject" className="block text-sm font-medium leading-6 text-gray-900">
                Subject
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="subject"
                  className="block w-full bg-transparent rounded-md border-0 py-1.5 pl-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder='Subject'
                  value={subject}
                  onChange={handlesubjectchange} 
                />
              </div>
            </div>        
          </div>
        </div>

        <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full bg-transparent rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                  value={description}
                  onChange={handledescriptionchange} 
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Describe the issue here.</p>
            </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
 </div>
  )
}