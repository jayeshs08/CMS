import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, {Toaster} from 'react-hot-toast';
import { useUserContext } from './UserContext'; // Import the useUserContext hook
import { Fragment, useRef} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function EditForm({dataProp,onFormSubmit,cancelEdit}) {
  const [userId,setUserId]=useState(dataProp.empId);
  const [reqBy, setReqBy] = useState(dataProp.reqBy);
  const [reqType, setReqType] = useState(dataProp.reqType);
  const [description, setDescription] = useState(dataProp.description);
  const [reqCategory, setReqCategory] = useState(dataProp.reqCategory);
  const [ticketNum, setTicketNum] = useState(dataProp.ticketNum);
  const [emailId,setEmailId]=useState(dataProp.emailId);
  const [phoneNo,setPhoneNo]=useState(dataProp.phoneNo);
  const [status,setStatus]=useState('Pending');
  
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

  const handledescriptionchange = (e) => {
    setDescription(e.target.value);
  };

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
      status
    };
  
    axios
      .post('http://localhost:5000/api/editrequests', requestData)
      .then((response) => {
        console.log('Request submitted successfully:', response.data);
        onFormSubmit(); 
        setOpen(false);
      })
      .catch((error) => {
        console.error('Error submitting request:', error);
      });
  };

  const handleClose=()=>{
    cancelEdit();
    setOpen(false);
  };

  return (
    
    <div className="editform">
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                      {/* <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" /> */}
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                      </svg>

                    </div>
                    <div className="mt-0 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        EDIT FORM
                      </Dialog.Title>
                      <form className='' onSubmit={handleSubmit}>
                      <div className="space-y-2">
                        <div className="border-b border-gray-900/10 pb-12">
                          <h1 className='mt-[20px] mb-[20px] font-bold text-gray-800'>Your ticket token is {ticketNum}</h1>
                          <div className="mt- grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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