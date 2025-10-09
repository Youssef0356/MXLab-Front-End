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
      <Route path='/userCreate' element={<UserCreate/>}/>
      <Route path='/userCreate/:id' element={<UserCreate/>}/>
      <Route path='/userView/:id' element={<UserView/>}/>
      <Route path='/userList' element={<UserList/>}/>
      <Route path='/siteView' element={<div>Site View Page</div>}/>
      <Route path='/siteCreate' element={<div>Site Create Page</div>}/>
      <Route path='/siteCart' element={<div>Site Cart Page</div>}/>
      <Route path='/equipmentsView' element={<div>Equipments View Page</div>}/>
      <Route path='/equipmentsCreate' element={<div>Equipments Create Page</div>}/>
      <Route path='/equipmentsIOT' element={<div>Equipments IOT Page</div>}/>

    </Routes>
  );
};

export default App;