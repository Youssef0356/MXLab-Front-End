import React from 'react';
import Dashboard from './Pages/Dashboard';
import LoginPage from './Components/Forms/LoginPage'
import {Routes , Route } from 'react-router-dom';
const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
  );
};
export default App;