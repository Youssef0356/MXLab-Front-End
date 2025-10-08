import React from 'react';
import Dashboard from './Pages/MainPage/Dashboard';
import LoginPage from './Components/Forms/LoginPage';
import InterventionCreate from './Pages/MainPage/Intervention/InterventionCreate';
import InterventionRequests from './Pages/MainPage/Intervention/InterventionRequests';
import InterventionList from './Pages/MainPage/Intervention/InterventionList';
import InterventionApproval from './Pages/MainPage/Intervention/InterventionApproval.tsx';
import InterventionDetails from './Pages/MainPage/Intervention/InterventionDetails';
import { Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/interventionCreate' element={<InterventionCreate/>}/>
      <Route path='/interventionRequests' element={<InterventionRequests/>}/>
      <Route path='/interventionList' element={<InterventionList/>}/>
      <Route path='/interventionApproval' element={<InterventionApproval/>}/>
      <Route path='/interventionDetails/:id' element={<InterventionDetails/>}/>

    </Routes>
  );
};

export default App;