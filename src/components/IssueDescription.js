import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function IssueDescription() {
  const location = useLocation();
  const [ticketDetails, setTicketDetails] = useState(null);
  const [error, setError] = useState(null);
  const [firstSelectedOption, setFirstSelectedOption] = useState('');
  const [secondDropdownOptions, setSecondDropdownOptions] = useState([]);
  const [secondSelectedOption, setSecondSelectedOption] = useState('');
  const [resolverId, setResolverId] = useState('');
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    const ticketNum = location.state?.ticketNum;

    if (ticketNum) {
      // Fetch ticket details from the backend API based on ticketNum
      axios
        .get(`http://localhost:5000/api/tickets/${ticketNum}`)
        .then(response => {
          console.log('Ticket details fetched successfully:', response.data);
          setTicketDetails(response.data);
          setError(null);
        })
        .catch(error => {
          console.error('Error fetching ticket details:', error);
          setError('Error fetching ticket details');
          setTicketDetails(null);
        });
    }
  }, [location]);

  
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


  const handleSubmit = (event) => {
    event.preventDefault();

    // Update the 'assignto' column in the issuetb table
    const ticketNum = ticketDetails.ticketNum;
    const assignto = secondSelectedOption;
    const status='Active';


    // Send a POST request to update the 'assignto' column
    axios
      .post('http://localhost:5000/api/update-issue', { ticketNum, status, assignto,})
      .then(response => {
        console.log('Issue updated successfully:', response.data);
        // Handle the success case
      })
      .catch(error => {
        console.error('Error updating issue:', error);
        // Handle the error case
      });
    closeModal(); // Close the modal after submitting the form
    navigate('/viewall');
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleBackClick = () => {
    navigate('/viewpending');
  };

  return (
    <div className='issuedescription h-[420px]'>
    {isModalOpen && (
    <div className='fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center'>
      <div className='bg-white p-6 rounded-lg max-w w-[70%] '>
      <h1 className='font-bold text-left mt-[2%] mx-[11%]'>Issue Description</h1>
      {ticketDetails ? (
        <div>
          <div className="flex flex-col mt-[1%] mx-[10%]">
            <div className="overflow-x-auto">
              <div className="p-1.5 w-full inline-block align-middle overflow-x-scroll">
                <div className=" border rounded-lg ">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                        >
                          Ticket No
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                        >
                          Employee id
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                        >
                          Request By
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                        >
                          Email id
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                        >
                          Phone No
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
                          Request category
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                          {ticketDetails.ticketNum}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{ticketDetails.empId}</td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{ticketDetails.reqBy}</td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{ticketDetails.emailId}</td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{ticketDetails.phoneNo}</td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{ticketDetails.reqType}</td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{ticketDetails.reqCategory}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className='ml-[1%]'>
              <h2 className='font-bold mt-[2%]'>Description:</h2>
              <p className='ml-[1%] mt-[1%] font-serif'>{ticketDetails.description}</p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleSubmit}
        >
          Save
        </button>
        <button
        type="button"
        className="rounded-md bg-gray-300 px-3 py-2 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={handleBackClick}
        >
          Back
        </button>
      </div>
          </div>
        </div>
      ) : (
        <p>{error || 'Loading ticket details...'}</p>
      )}
      </div>
    </div>
    )} 
    </div>
  );
}

export default IssueDescription;