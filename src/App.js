import React from 'react';
import Header from './components/Header';
import {useState} from 'react';
import InputForm from './components/InputForm';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes,Route, Navigate} from 'react-router-dom';
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
import Protected from './components/Protected';
import ResolverViewAll from './components/ResolverViewAll';
import Forgot from './components/Forgot';
import ForgotPassword from './components/ForgotPassword';
import Escalate from './components/Escalate';
import EditForm from './components/EditForm';
import ViewHistory from './components/ViewHistory';
import AssignHistory from './components/AssignHistory';

function App() {
  const {isAuthenticated} = useUserContext();
  const [showModal, setShowModal] = useState(false);
  return (

    <Router>
        <Routes>
          <Route exact path="/" element={
          <>
          <Login/>
          </>
          } />

          <Route exact path="/inputform" element={
            <Protected isAuthenticated={isAuthenticated}>
            <Header/> 
            <InputForm/>
            </Protected>
          } />

          <Route exact path="/viewstatus" element={
          <Protected isAuthenticated={isAuthenticated}>
          <Header/>
          <ViewStatus setShowModal={setShowModal}/>
          </Protected>
          } />

          <Route exact path="/editform" element={
          <Protected isAuthenticated={isAuthenticated}>
          <Header/>
          <EditForm/>
          </Protected>
          } />
          <Route exact path="/viewhistory" element={
          <Protected isAuthenticated={isAuthenticated}>
          <Header/>
          <ViewHistory/>
          </Protected>
          } />  


          <Route exact path="/login" element={
          <>
          <Login/>
          
          </>
          } />

          

          <Route exact path="/viewall" element={
          <Protected isAuthenticated={isAuthenticated}>
          <AdminHeader/>
          <ViewAll/>
          </Protected>
          } />
          <Route exact path="/resolver" element={
          <Protected isAuthenticated={isAuthenticated}>
          <ResolverHeader/>
          <Resolver/>
          </Protected>
          } />
          <Route exact path="/resolverviewall" element={
          <Protected isAuthenticated={isAuthenticated}>
          <ResolverHeader/>
          <ResolverViewAll/>
          </Protected>
          } />

          <Route exact path="/issuedescription" element={
          <Protected isAuthenticated={isAuthenticated}>
          <AdminHeader/>
          <IssueDescription/>
          </Protected>
          } />

          <Route exact path="/viewpending" element={
          <Protected isAuthenticated={isAuthenticated}>
          <AdminHeader/>
          <ViewPending/>
          </Protected>
          } />

          <Route exact path="/forgotpassword" element={
          <Protected isAuthenticated={isAuthenticated}>
          <AdminHeader/>
          <ForgotPassword/>
          </Protected>
          } 
          />

          <Route exact path="/forgot" element={
          <>
          <Forgot/>
          </>
          } />
          <Route exact path="/assignhistory" element={
          <>
          <AssignHistory showModal={showModal} setShowModal={setShowModal} />
          </>
          } />
          <Route exact path="/escalate" element={
          <Protected isAuthenticated={isAuthenticated}>
          <ResolverHeader/>
          <Escalate/>
          </Protected>
          } />

        </Routes>
    </Router>
  );
}

export default App;