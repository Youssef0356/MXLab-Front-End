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
import SiteList from './Pages/MainPage/Site/SiteList';
import SiteCreate from './Pages/MainPage/Site/SiteCreate';
import SitesView from './Pages/MainPage/Site/SitesView';
import ListeEquipment from './Pages/MainPage/Equipments/ListeEquipment';
import CreateEquipment from './Pages/MainPage/Equipments/CreateEquipment';
import IOT from './Pages/MainPage/Equipments/iot';
import HistoriqueMaintenance from './Pages/MainPage/Maintenance/HistoriqueMaintenance';
import PreventiveMaintenance from './Pages/MainPage/Maintenance/PreventiveMaintenance';
import MaintenanceCalendar from './Pages/MainPage/Maintenance/MaintenanceCalendar';
import Visualisations from './Pages/MainPage/Visualisations';

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