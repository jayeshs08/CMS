import React from 'react';
import Header from './components/Header';
import InputForm from './components/InputForm';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes,Route, Navigate } from 'react-router-dom';
import ViewStatus from './components/ViewStatus';
import Admin from './components/Admin';
import AdminHeader from './components/AdminHeader';
import ViewPending from './components/ViewPending';
import ViewAll from './components/ViewAll';
import Login from './components/Login'
import Resolver from './components/Resolver';
import IssueDescription from './components/IssueDescription';
import ResolverHeader from './components/ResolverHeader';
import { useUserContext } from './components/UserContext';

function App() {
  return (

    <Router>
        <Routes>
          <Route exact path="/" element={
          <>
          <Login/>
          </>
          } />

          <Route exact path="/inputform" element={
            <>
            <Header/> 
            <InputForm/>
            </>
          } />

          <Route exact path="/viewstatus" element={
          <>
          <Header/>
          <ViewStatus/>
          </>
          } />


          <Route exact path="/login" element={
          <>
          <Login/>
          
          </>
          } />
          <Route exact path="viewstatus/login" element={
          <>
          <Login/>
          
          </>
          } />
          <Route exact path="inputform/login" element={
          <>
          <Login/>
          
          </>
          } />

          <Route exact path="/viewall" element={
          <>
          <AdminHeader/>
          <ViewAll/>
          </>
          } />
          <Route exact path="/resolver" element={
          <>
          <ResolverHeader/>
          <Resolver/>
          </>
          } />

          <Route exact path="/issuedescription" element={
          <>
          <Header/>
          <IssueDescription/>
          </>
          } />

          <Route exact path="/viewpending" element={
          <>
          <AdminHeader/>
          <ViewPending/>
          </>
          } />

        </Routes>
    </Router>
  );
}

export default App;