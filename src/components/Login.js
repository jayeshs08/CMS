import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "./UserContext";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {setUserMail, setUserRole, setIsAuthenticated } = useUserContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email: userName,
        password: password,
      });
      console.log(response.data);
      if (response.data.success) {
        toast.success("Login successful");
        console.log("authentication successful");
        //set user email
        setUserMail(userName);

        
        // Handle navigation based on the role received from the server
        if (response.data.role === "admin") {
          navigate("/viewall");
          setUserRole('admin');
        } 
        else if (response.data.role === "developer") {
          navigate("/resolver");
          setUserRole('resolver');
        } 
        else if(response.data.role === "user") {
          // Handle other roles or unknown cases here
          // For example, you can show an error message or redirect to a default page
          navigate("/inputform");
          setUserRole('user');
        }
    
      } 
      else {
        toast.error("Login failed");
        console.log("login Failed response data not success");
      }
      
    // //nested try catch block for header name fetching
    //   try {
    //     const response = await axios.post("http://localhost:5000/api/resolverpage", {
    //       email: userName
    //     });
    //       }
    // catch (error) {
    //         console.log("error in submitting form data");
    //       }
      
    } catch (error) {
      console.log("error in submitting form data");
    }
  };

  return(
    <div className="login relative flex flex-col justify-center min-h-screen overflow-hidden">
    <Toaster/>
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
            <h1 className="text-3xl font-semibold text-center text-blue-800">
               LOG IN
            </h1>
            <form className="mt-6"  onSubmit={handleSubmit}>
                <div className="mb-2">
                    <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-gray-800"
                    >
                        E-Mail
                    </label>
                    <input
                        value={userName}
                        onChange={(e)=> setUserName(e.target.value)}
                        type="email"
                        className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                </div>
                <div className="mb-2">
                    <label
                        htmlFor="password"
                        className="block text-sm font-semibold text-gray-800"
                    >
                        Password
                    </label>
                    <input
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        type="password"
                        className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                </div>
                <a
                    href="#"
                    className="text-xs text-blue-800 hover:underline"
                >
                    Forget Password?
                </a>
                <div className="mt-6">
                    <button type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-purple-600">
                        Login
                    </button>
                </div>
            </form>
        </div>
    </div>
);
};

export default Login;