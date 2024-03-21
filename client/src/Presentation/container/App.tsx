import React from 'react';
import LoginPage from './login';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Home/Home';

function App() {
  return (
    <div className='AppPage'>
      <Routes >
        <Route path="/" element={<LoginPage/>} />
        <Route path="/Home" element={<Home/>} />
      </Routes>
    </div>
    
  );
}

export default App;
