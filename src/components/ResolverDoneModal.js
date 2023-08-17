import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, {Toaster} from 'react-hot-toast';
import { useUserContext } from './UserContext'; // Import the useUserContext hook
import { Fragment, useRef} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

function ResolverDoneModal({dataProp,onClose,onCancel,onCloseClick}) {
  const [userId,setUserId]=useState(dataProp.empId);
  const [reqBy, setReqBy] = useState(dataProp.reqBy);
  const [reqType, setReqType] = useState(dataProp.reqType);
  const [description, setDescription] = useState(dataProp.description);
  const [reqCategory, setReqCategory] = useState(dataProp.reqCategory);
  const [ticketNum, setTicketNum] = useState(dataProp.ticketNum);
  const [emailId,setEmailId]=useState(dataProp.emailId);
  const [phoneNo,setPhoneNo]=useState(dataProp.phoneNo);
  const [subject,setSubject]=useState(dataProp.subject);
  
  const [open, setOpen] = useState(true)
  const cancelButtonRef = useRef(null)

  const handleClose=()=>{
    setOpen(false);
    onClose();
  };
  const handleCancel=()=>{
    setOpen(false);
    onCancel();
  }
  const handleClick=()=>{
    setOpen(false);
    onCloseClick();
  }
  return (
<div className="resolverdonemodal">
    <Toaster/>
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} static onClose={()=>null} >
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
              <Dialog.Panel className="my-8 w-full max-w-md">
              <div className="bg-white pb-4 rounded-md">
                  <div className="items-end">
                    <div className="text-left">
                      <form>
                      <div className="space-y-2">
                        <div className="border-gray-900/10">
                          <div className='grid grid-cols-4 gap-4 pl-[10%] pt-[25px] pb-[10px] bg-gray-800 font-bold text-white rounded-t-md'>
                            <div className='col-span-3 '>Ticket token is {ticketNum}</div>
                            <div className='col-span-1 pl-[50%]'>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-6 hover:text-sky-700" onClick={handleClick}>
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </div>
                            <div></div>
                          </div>
                          <div className="px-[15%] mt-[5%] grid grid-cols-4 gap-4 ">
                              <div className='col-span-2 text-sm font-bold leading-6 text-gray-800'>EMPLOYEE ID:</div>
                              <div className='col-span-1 text-sm font-medium leading-6 text-gray-700 '>{userId}</div>
                              <div className='col-span-2 text-sm font-bold leading-6 text-gray-800'>NAME:</div>
                              <div className='col-span-1 text-sm font-medium leading-6 text-gray-700'>{reqBy}</div>
                              <div className='col-span-2  text-sm font-bold leading-6 text-gray-800'>EMAIL ADDRESS:</div>
                              <div className='col-span-1 text-sm font-medium leading-6 text-gray-700'>{emailId}</div>
                              <div className='col-span-2 text-sm font-bold leading-6 text-gray-800'>PHONE:</div>
                              <div className='col-span-1 text-sm font-medium leading-6 text-gray-700'>{phoneNo}</div>
                              <div className='col-span-2 text-sm font-bold leading-6 text-gray-800'>REQUEST TYPE:</div>
                              <div className='col-span-1 text-sm font-medium leading-6 text-gray-700'>{reqType}</div>
                              <div className='col-span-2 text-sm font-bold leading-6 text-gray-800'>CATEGORY:</div>
                              <div className='col-span-1text-sm font-medium leading-6 text-gray-700'>{reqCategory}</div>
                              <div className='col-span-2 text-sm font-bold leading-6 text-gray-800'>SUBJECT:</div>
                              <div className='col-span-1text-sm font-medium leading-6 text-gray-700'>{subject}</div>
                          </div>
                        </div>
                        <div className="px-[15%]  grid grid-cols-2 ">
                              <div className='col-span-1 text-sm font-bold leading-6 text-gray-800'>DESCRIPTION:</div>
                              <div className='col-span-1 text-sm font-medium leading-6 text-gray-700 break-words'>{description}</div>
                            </div>
                      </div>
                      <div className="flex items-center justify-center gap-x-6 mt-4">
                      <button
                          type="button"
                          className="rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          onClick={handleClose}
                        >
                          Task Completed
                        </button>
                      <button
                          type="button"
                          className="rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          onClick={handleCancel}
                        >
                          Cancel Task
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

export default ResolverDoneModal;