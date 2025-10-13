import React from 'react';
import Dashboard from './Pages/Dashboard/Dashboard';
import LoginPage from './Components/Forms/LoginPage';
import InterventionCreate from './Pages/Intervention/InterventionCreate';
import InterventionRequests from './Pages/Intervention/InterventionRequests';
import InterventionList from './Pages/Intervention/InterventionList';
import InterventionApproval from './Pages/Intervention/InterventionApproval.tsx';
import InterventionDetails from './Pages/Intervention/InterventionDetails';
import UserView from './Pages/Utilisateur/UserView';
import UserCreate from './Pages/Utilisateur/UserCreate';
import UserList from './Pages/Utilisateur/UserList';
import SiteList from './Pages/Site/SiteList';
import SiteCreate from './Pages/Site/SiteCreate';
import SitesView from './Pages/Site/SitesView';
import ListeEquipment from './Pages/Equipments/ListeEquipment';
import CreateEquipment from './Pages/Equipments/CreateEquipment';
import IOT from './Pages/Equipments/iot';
import HistoriqueMaintenance from './Pages/Maintenance/HistoriqueMaintenance';
import PreventiveMaintenance from './Pages/Maintenance/PreventiveMaintenance';
import MaintenanceCalendar from './Pages/Maintenance/MaintenanceCalendar';
import Visualisations from './Pages/Dashboard/Visualisations';

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
      <Route path='/siteView' element={<SiteList/>}/>
      <Route path='/siteCreate' element={<SiteCreate/>}/>
      <Route path='/siteCreate/:id' element={<SiteCreate/>}/>
      <Route path='/siteCart' element={<SitesView/>}/>
      <Route path='/equipmentsView' element={<ListeEquipment/>}/>
      <Route path='/equipmentsCreate' element={<CreateEquipment/>}/>
      <Route path='/equipmentsIOT' element={<IOT/>}/>
      <Route path='/maintenanceHistory' element={<HistoriqueMaintenance/>}/>
      <Route path='/maintenance-view' element={<PreventiveMaintenance/>}/>
      <Route path='/calendar' element={<MaintenanceCalendar/>}/>
      <Route path='/visualisations' element={<Visualisations/>}/>

    </Routes>
  );
};

export default App;