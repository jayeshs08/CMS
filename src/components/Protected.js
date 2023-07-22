import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from './UserContext';
export default function Protected({isAuthenticated,children}) {

        if(!isAuthenticated)
        return (<Navigate to='/' replace></Navigate>)

        else return children;
}
