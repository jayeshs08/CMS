import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, {Toaster} from 'react-hot-toast';
import { useUserContext } from './UserContext'; // Import the useUserContext hook
import { Fragment, useRef} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function Escalate({dataProp,resName,resId,onClose}) {
  const [userId,setUserId]=useState(dataProp.empId);
  const [reqBy, setReqBy] = useState(dataProp.reqBy);
  const [reqType, setReqType] = useState(dataProp.reqType);
  const [description, setDescription] = useState(dataProp.description);
  const [reqCategory, setReqCategory] = useState(dataProp.reqCategory);
  const [ticketNum, setTicketNum] = useState(dataProp.ticketNum);
  const [emailId,setEmailId]=useState(dataProp.emailId);
  const [phoneNo,setPhoneNo]=useState(dataProp.phoneNo);
  const [status,setStatus]=useState('Pending');
  const [firstSelectedOption, setFirstSelectedOption] = useState('');
  const [secondDropdownOptions, setSecondDropdownOptions] = useState([]);
  const [secondSelectedOption, setSecondSelectedOption] = useState('');
  const [resolverId, setResolverId] = useState('');
  const [open, setOpen] = useState(true)
  const cancelButtonRef = useRef(null)
  
  
  const handleuserid=(e)=>{
    setUserId(e.target.value);
  }

  const handlereqbyChange = (e) => {
    setReqBy(e.target.value);
  };

  const handlereqtypeChange = (e) => {
    setReqType(e.target.value);
  };


  const handlereqcategory = (e) => {
    setReqCategory(e.target.value);
  };

  const handleFirstDropdownChange = (event) => {
    const selectedValue = event.target.value;
    setFirstSelectedOption(selectedValue);

    // Set the options for the second dropdown based on the selected value of the first dropdown
    // Replace `apiEndpoint` with the actual API endpoint to fetch the options from the database
    axios
      .get(`http://localhost:5000/api/options`, { params: { level: selectedValue } })
      .then(response => {
        // Update the second dropdown options state variable with the fetched options
        setSecondDropdownOptions(response.data.options);
      })
      .catch(error => {
        console.error('Error fetching second dropdown options:', error);
        setSecondDropdownOptions([]);
      });

    // Reset the selected option for the second dropdown
    setSecondSelectedOption('');
    setResolverId('');
  };

  const handleSecondDropdownChange = (event) => {
    const selectedValue = event.target.value;
    setSecondSelectedOption(selectedValue);
  };

  

  const handleSubmit = (e) => {
    e.preventDefault(); 
    const action="Current";
    const actionEsc="Escalate";
    console.log(secondSelectedOption);
    const assign=secondSelectedOption;
    axios
      .post('http://localhost:5000/api/updateHistoryStatus', {ticketNum, action, actionEsc, assign,resName,resId })
      .then((response) => {
        console.log('Request submitted successfully:', response.data); 
        onClose();
      })
      .catch((error) => {
        console.error('Error submitting request:', error);
      });
  };

  const handleClose=()=>{
    onClose();
    setOpen(false);
  };

  return (
    
    <div className="escalate">
    <Toaster/>
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-[30%] ">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-[20%]">
                      {/* <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" /> */}
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                      </svg>

                    </div>
                    <div className="sm:ml-5 sm:mt-0 sm:text-left sm:w-[50%]" >
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        ESCALATE FORM
                      </Dialog.Title>
                      <form className='' onSubmit={handleSubmit}>
                      <div className="space-y-5">
                       
              <div className="sm:col-span-3">
                <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                  Select Level
                </label>
                <div className="mt-2">
                  <select
                    id="category"
                    name="category"
                    autoComplete="category-name"
                    className="block w-full bg-transparent rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    value={firstSelectedOption}
                    onChange={handleFirstDropdownChange}
                  >
                    <option disabled value="" hidden>Select one</option>
                    <option value="Level 1">Level 1</option>
                    <option value="Level 2">Level 2</option>
                    <option value="Level 3">Level 3</option>
                  </select>
                </div>
              </div>   

              {secondDropdownOptions.length > 0 && (
                <div className="sm:col-span-3">
                  <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                    Employee Name
                  </label>
                  <div className="mt-2">
                    <select
                      id="name"
                      name="name"
                      autoComplete="name"
                      className="block w-full bg-transparent rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      value={secondSelectedOption}
                      onChange={handleSecondDropdownChange}
                    >   <option disabled value="" hidden>Select employee</option>
                      {secondDropdownOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            {/* </div> */}

                      </div>

                      <div className="mt-2 flex items-center justify-end gap-x-6">
                      <button
                          type="button"
                          className="rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          onClick={handleClose}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Save
                        </button>
                      </div>
                   </form>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
 </div>
  )
}