import React from 'react';
import Dashboard from './Pages/MainPage/Dashboard';
import LoginPage from './Components/Forms/LoginPage';
import InterventionCreate from './Pages/MainPage/Intervention/InterventionCreate';
import InterventionView from './Pages/MainPage/Intervention/InterventionView';
import { Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/intervention-create' element={<InterventionCreate/>}/>
      <Route path='/intervention-view' element={<InterventionView/>}/>
    </Routes>
  );
};

export default App;