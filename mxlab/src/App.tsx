import React from 'react';
import Dashboard from './Pages/MainPage/Dashboard';
import LoginPage from './Components/Forms/LoginPage';
import InterventionCreate from './Pages/MainPage/Intervention/InterventionCreate';
import InterventionRequests from './Pages/MainPage/Intervention/InterventionRequests';
import InterventionList from './Pages/MainPage/Intervention/InterventionList';
import InterventionApproval from './Pages/MainPage/Intervention/InterventionApproval.tsx';
import InterventionDetails from './Pages/MainPage/Intervention/InterventionDetails';
import UserView from './Pages/MainPage/Utilisateur/UserView';
import UserCreate from './Pages/MainPage/Utilisateur/UserCreate';
import UserList from './Pages/MainPage/Utilisateur/UserList';

import { Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/interventionCreate' element={<InterventionCreate/>}/>
      <Route path='/interventionRequests' element={<InterventionRequests/>}/>
      <Route path='/interventionList' element={<InterventionList/>}/>
      <Route path='/interventionApproval/:id' element={<InterventionApproval/>}/>
      <Route path='/interventionDetails/:id' element={<InterventionDetails/>}/>
      <Route path='/user-view' element={<UserView/>}/>
      <Route path='/user-create' element={<UserCreate/>}/>
      <Route path='/user-list' element={<UserList/>}/>

    </Routes>
  );
};

export default App;