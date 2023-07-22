import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loginName, setLoginName] = useState('');
  const [userMail, setUserMail]=useState('');
  const [userData, setUserData] = useState([]);
  const [userRole, setUserRole] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Function to fetch user data using the email
  const fetchUserData = async (userMail) => {
    try {
      console.log("in fetch userdata:");
      console.log(userMail);
      // const response = await axios.post(`http://localhost:5000/api/userdata`, {userMail});

      if(userRole === "user")
      {
        const response = await axios.post(`http://localhost:5000/api/userdata`, {userMail});
        console.log("user data recieved in context:");
        console.log(response.data.data);
        setUserData(response.data.data);
      }
      else if(userRole === "admin")
      {
        const response = await axios.post(`http://localhost:5000/api/admindata`, {userMail});
        console.log("admin data recieved in context:");
        console.log(response.data.data);
        setUserData(response.data.data);
      }
      else if(userRole === "resolver")
      {
        const response = await axios.post(`http://localhost:5000/api/resolverdata`, {userMail});
        console.log("resolver data recieved in context:");
        console.log(response.data.data);
        setUserData(response.data.data);
      }
      
      // setUserData(response.data.data);

      console.log("USER DATA SET:");
      console.log(userData);
      
    } catch (error) {
      console.error("Error fetching user data in context:", error);
    }
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    console.log("Stored user data in localstorage:");
    console.log(storedUserData);
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }

    const storedIsAuthenticated = localStorage.getItem('isAuthenticated');
    if (storedIsAuthenticated) {
      setIsAuthenticated(JSON.parse(storedIsAuthenticated));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(userData));
  }, [userData]);

  useEffect(() => {
    if (userMail && userRole) {
      // Fetch user data when userEmail changes
      fetchUserData(userMail);
    }
  }, [userMail]);


  useEffect(() => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  return (
    <UserContext.Provider value={{ loginName, setLoginName,userData, userMail, setUserMail, setUserRole, isAuthenticated, setIsAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);